// Optimizes the 1.4GB photogrammetry GLB (JD MARGARETH - REURB) for web/mobile:
// chunked meshopt simplification (WASM can't handle 27M verts at once),
// recenter to origin (UTM coords break f32 precision), unlit vertex-color
// material, Draco compression.
import { NodeIO } from "@gltf-transform/core";
import {
  KHRDracoMeshCompression,
  KHRMaterialsUnlit,
} from "@gltf-transform/extensions";
import {
  simplify,
  weld,
  center,
  joinPrimitives,
  prune,
} from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3dgltf";

const INPUT = process.argv[2];
const OUTPUT = process.argv[3];
const CHUNKS = 12;
const RATIO = 0.04; // keep ~4% of vertices (~1.1M verts / ~2.2M tris)
const ERROR = 0.01;

const log = (...args) => console.log(new Date().toISOString(), ...args);

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression, KHRMaterialsUnlit])
  .registerDependencies({
    "draco3d.encoder": await draco3d.createEncoderModule(),
    "draco3d.decoder": await draco3d.createDecoderModule(),
  });

log("reading", INPUT);
const doc = await io.read(INPUT);
const root = doc.getRoot();

const mesh = root.listMeshes()[0];
const srcPrim = mesh.listPrimitives()[0];
const srcIndices = srcPrim.getIndices().getArray();
const srcPos = srcPrim.getAttribute("POSITION").getArray();
const srcColor = srcPrim.getAttribute("COLOR_0");
const srcColorArr = srcColor ? srcColor.getArray() : null;
const colorSize = srcColor ? srcColor.getElementSize() : 0;

const triCount = srcIndices.length / 3;
log(`mesh: ${triCount} tris, ${srcPos.length / 3} verts, color=${!!srcColor}`);

// Build compacted chunk primitives (local vertex buffers so the WASM
// simplifier never sees the full 27M-vertex buffer).
const buffer = root.listBuffers()[0];
const chunkPrims = [];
const trisPerChunk = Math.ceil(triCount / CHUNKS);

for (let c = 0; c < CHUNKS; c++) {
  const triStart = c * trisPerChunk;
  const triEnd = Math.min(triCount, triStart + trisPerChunk);
  if (triStart >= triEnd) break;

  const idxCount = (triEnd - triStart) * 3;
  const remap = new Map();
  const localIdx = new Uint32Array(idxCount);
  for (let i = 0; i < idxCount; i++) {
    const old = srcIndices[triStart * 3 + i];
    let next = remap.get(old);
    if (next === undefined) {
      next = remap.size;
      remap.set(old, next);
    }
    localIdx[i] = next;
  }

  const vertCount = remap.size;
  const pos = new Float32Array(vertCount * 3);
  const col = srcColorArr ? new srcColorArr.constructor(vertCount * colorSize) : null;
  for (const [old, next] of remap) {
    pos[next * 3] = srcPos[old * 3];
    pos[next * 3 + 1] = srcPos[old * 3 + 1];
    pos[next * 3 + 2] = srcPos[old * 3 + 2];
    if (col) {
      for (let k = 0; k < colorSize; k++) {
        col[next * colorSize + k] = srcColorArr[old * colorSize + k];
      }
    }
  }

  const prim = doc.createPrimitive();
  prim.setIndices(
    doc.createAccessor().setType("SCALAR").setArray(localIdx).setBuffer(buffer)
  );
  prim.setAttribute(
    "POSITION",
    doc.createAccessor().setType("VEC3").setArray(pos).setBuffer(buffer)
  );
  if (col) {
    const acc = doc
      .createAccessor()
      .setType(colorSize === 4 ? "VEC4" : "VEC3")
      .setArray(col)
      .setBuffer(buffer);
    if (srcColor.getNormalized()) acc.setNormalized(true);
    prim.setAttribute("COLOR_0", acc);
  }
  chunkPrims.push(prim);
  log(`chunk ${c + 1}/${CHUNKS}: ${idxCount / 3} tris, ${vertCount} verts`);
}

// Swap chunk primitives in, drop the giant original (and its NORMAL attr).
const oldIndices = srcPrim.getIndices();
const oldAttrs = srcPrim.listAttributes();
mesh.removePrimitive(srcPrim);
srcPrim.dispose();
oldIndices.dispose();
for (const a of oldAttrs) a.dispose();
for (const prim of chunkPrims) mesh.addPrimitive(prim);

log("simplifying (per-chunk)...");
await MeshoptSimplifier.ready;
await doc.transform(
  simplify({
    simplifier: MeshoptSimplifier,
    ratio: RATIO,
    error: ERROR,
    lockBorder: true,
  })
);

// Re-join the simplified chunks into one primitive, weld the seams.
const prims = mesh.listPrimitives();
log(`joining ${prims.length} chunks...`);
const joined = joinPrimitives(prims);
for (const prim of prims) {
  mesh.removePrimitive(prim);
  prim.dispose();
}
mesh.addPrimitive(joined);
await doc.transform(weld(), prune());

// Unlit vertex-color material (photogrammetry has no normals worth keeping).
const unlitExt = doc.createExtension(KHRMaterialsUnlit);
const mat = doc
  .createMaterial("terrain")
  .setBaseColorFactor([1, 1, 1, 1])
  .setExtension("KHR_materials_unlit", unlitExt.createUnlit());
joined.setMaterial(mat);
joined.setAttribute("NORMAL", null);

// Recenter: UTM coordinates (~7.4e6) destroy f32 precision in the viewer.
await doc.transform(center({ pivot: "center" }));

doc
  .createExtension(KHRDracoMeshCompression)
  .setRequired(true)
  .setEncoderOptions({
    quantizationBits: { POSITION: 14, COLOR: 8, GENERIC: 8 },
  });

const finalPrim = mesh.listPrimitives()[0];
log(
  `final: ${finalPrim.getIndices().getCount() / 3} tris, ` +
    `${finalPrim.getAttribute("POSITION").getCount()} verts`
);

log("writing", OUTPUT);
await io.write(OUTPUT, doc);
log("done");
