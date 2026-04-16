"use client";

import { CSSProperties, useEffect, useState } from "react";
import type { ModelViewerConfig } from "@/data/projects";

type ModelViewer3DProps = {
  src: string;
  poster: string;
  alt: string;
  config?: ModelViewerConfig;
};

export function ModelViewer3D({ src, poster, alt, config }: ModelViewer3DProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    import("@google/model-viewer")
      .then(() => {
        if (active) {
          setReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setFailed(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <div className="project-stage-fallback">
        <img src={poster} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-ink-950/70 p-4 text-mineral-50 backdrop-blur">
          <strong className="block text-sm">Visualização 3D indisponível</strong>
          <span className="mt-1 block text-xs text-mineral-100/70">
            A imagem técnica foi mantida para preservar a leitura do projeto.
          </span>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="project-stage-loading">
        <span className="loader-ring" />
        <div>
          <strong>Carregando visualização 3D</strong>
          <p>O modelo é carregado somente quando você abre o projeto.</p>
        </div>
      </div>
    );
  }

  return (
    <model-viewer
      src={src}
      poster={poster}
      alt={alt}
      camera-controls
      auto-rotate
      auto-rotate-delay="1800"
      interaction-prompt-threshold="1500"
      touch-action="pan-y"
      shadow-intensity="1"
      exposure="1.08"
      loading="eager"
      environment-image="neutral"
      interaction-prompt="auto"
      orientation={config?.orientation}
      camera-orbit={config?.cameraOrbit}
      camera-target={config?.cameraTarget}
      field-of-view={config?.fieldOfView}
      min-camera-orbit={config?.minCameraOrbit}
      max-camera-orbit={config?.maxCameraOrbit}
      style={
        {
          width: "100%",
          height: "100%",
          minHeight: "420px",
          "--poster-color": "transparent",
          "--progress-bar-color": "#d6b67a",
        } as CSSProperties
      }
    />
  );
}


