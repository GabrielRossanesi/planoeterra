// Aligns a terrain GLB's principal axis (PCA over the ground plane) with the
// X axis, so viewers frame it landscape by default. Assumes the Z-up
// photogrammetry convention used by our optimized exports (see
// optimize-glb.mjs) and rewrites the file in place, preserving Draco.
import { NodeIO } from "@gltf-transform/core";
import {
  KHRDracoMeshCompression,
  KHRMaterialsUnlit,
} from "@gltf-transform/extensions";
import draco3d from "draco3dgltf";

const INPUT = process.argv[2];
const OUTPUT = process.argv[3] || INPUT;

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression, KHRMaterialsUnlit])
  .registerDependencies({
    "draco3d.decoder": await draco3d.createDecoderModule(),
    "draco3d.encoder": await draco3d.createEncoderModule(),
  });

const doc = await io.read(INPUT);
const prims = doc
  .getRoot()
  .listMeshes()
  .flatMap((mesh) => mesh.listPrimitives());

// Covariance of (x, y) across all primitives (Z is height in these files).
let n = 0;
let mx = 0;
let my = 0;
for (const prim of prims) {
  const arr = prim.getAttribute("POSITION").getArray();
  for (let i = 0; i < arr.length; i += 3) {
    mx += arr[i];
    my += arr[i + 1];
    n++;
  }
}
mx /= n;
my /= n;

let sxx = 0;
let syy = 0;
let sxy = 0;
for (const prim of prims) {
  const arr = prim.getAttribute("POSITION").getArray();
  for (let i = 0; i < arr.length; i += 3) {
    const dx = arr[i] - mx;
    const dy = arr[i + 1] - my;
    sxx += dx * dx;
    syy += dy * dy;
    sxy += dx * dy;
  }
}

const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy);
console.log(`principal axis at ${((angle * 180) / Math.PI).toFixed(2)}deg — rotating to X`);

const cos = Math.cos(-angle);
const sin = Math.sin(-angle);
for (const prim of prims) {
  const pos = prim.getAttribute("POSITION");
  const arr = pos.getArray();
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i] - mx;
    const y = arr[i + 1] - my;
    arr[i] = x * cos - y * sin;
    arr[i + 1] = x * sin + y * cos;
  }
  pos.setArray(arr);
}

await io.write(OUTPUT, doc);
console.log("written", OUTPUT);
