"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
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
  
  // Real model-viewer load states
  const [modelLoading, setModelLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [modelError, setModelError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const initialOrbitRef = useRef<string | null>(null);

  // Dynamic import of the model-viewer custom element script
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

  // Set up event listeners for the model-viewer custom element
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onProgress = (event: any) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      setProgressPercent(progress);
    };

    const onLoad = () => {
      // Auto-fit camera logic
      viewer.updateFraming();

      // Open landscape: if the model's long axis is pointing at the camera,
      // rotate the view 90° so terrain strips read horizontally on screen.
      try {
        const dims = viewer.getDimensions();
        const orbit = viewer.getCameraOrbit();
        if (dims && orbit) {
          const screenWidthAt = (theta: number) =>
            dims.x * Math.abs(Math.cos(theta)) +
            dims.z * Math.abs(Math.sin(theta));
          let theta = orbit.theta;
          if (screenWidthAt(theta + Math.PI / 2) > screenWidthAt(theta)) {
            theta += Math.PI / 2;
          }
          const orbitStr = `${((theta * 180) / Math.PI).toFixed(1)}deg ${(
            (orbit.phi * 180) /
            Math.PI
          ).toFixed(1)}deg ${orbit.radius.toFixed(3)}m`;
          initialOrbitRef.current = orbitStr;
          viewer.cameraOrbit = orbitStr;
          viewer.jumpCameraToGoal();
        }
      } catch {
        // Framing heuristics are best-effort; the default orbit still works.
      }

      setModelLoading(false);
    };

    const onError = (err: any) => {
      console.error("Model viewer error details:", err);
      setModelError(true);
      setModelLoading(false);
    };

    viewer.addEventListener("progress", onProgress);
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);

    return () => {
      viewer.removeEventListener("progress", onProgress);
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
    };
  }, [ready]);

  // Full Screen HUD Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Fullscreen request failed:", err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Reset Camera HUD Handler
  const handleResetCamera = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.cameraOrbit =
        initialOrbitRef.current || config?.cameraOrbit || "auto auto auto";
      viewer.cameraTarget = config?.cameraTarget || "auto auto auto";
      viewer.fieldOfView = config?.fieldOfView || "auto";
      if (!initialOrbitRef.current) {
        viewer.updateFraming();
      }
    }
  };

  // If import fails, fallback to image poster
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[52svh] md:min-h-[420px] overflow-hidden rounded-[1.35rem] md:rounded-[1.55rem] flex flex-col justify-center items-center select-none"
      style={{
        background: "radial-gradient(circle, #0e2015 0%, #080a09 100%)",
      }}
    >
      {/* 1. Loader skeleton view */}
      {ready && modelLoading && !modelError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-ink-950/80 backdrop-blur-md">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-16 h-16 border-2 border-mineral-100/10 border-t-mineral-300 rounded-full animate-spin" />
            <span className="absolute text-sm font-semibold text-mineral-200">{progressPercent}%</span>
          </div>
          <strong className="text-sm font-bold uppercase tracking-[0.2em] text-mineral-50">
            Carregando malha 3D
          </strong>
          <p className="mt-2 text-xs text-mineral-100/60 max-w-[240px]">
            Processando curvas planiais e pontos altimétricos do terreno.
          </p>
        </div>
      )}

      {/* 2. Error Fallback view */}
      {ready && modelError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-ink-950/90 backdrop-blur-md">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-12 h-12 text-mineral-300 mb-4 opacity-75">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
          <strong className="text-sm font-bold uppercase tracking-[0.15em] text-mineral-50">
            Erro na visualização 3D
          </strong>
          <p className="mt-2 text-xs text-mineral-100/60 max-w-[260px]">
            Não foi possível carregar o modelo. A imagem técnica estática pode ser acessada na aba ao lado.
          </p>
          <button
            type="button"
            onClick={() => {
              setModelError(false);
              setModelLoading(true);
              setProgressPercent(0);
              const viewer = viewerRef.current;
              if (viewer) {
                // Force reload of src
                viewer.src = src;
              }
            }}
            className="mt-5 rounded-full bg-mineral-200 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-950 hover:bg-mineral-100 transition duration-200"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* 3. model-viewer Element */}
      {ready ? (
        <model-viewer
          ref={viewerRef}
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
          camera-orbit={config?.cameraOrbit || "auto auto auto"}
          camera-target={config?.cameraTarget || "auto auto auto"}
          field-of-view={config?.fieldOfView || "auto"}
          
          // Limits zoom to prevent camera clipping
          min-camera-orbit={config?.minCameraOrbit || "auto auto 15%"}
          max-camera-orbit={config?.maxCameraOrbit || "auto auto 250%"}
          
          style={
            {
              width: "100%",
              height: "100%",
              minHeight: "min(52svh, 420px)",
              background: "transparent",
              "--poster-color": "transparent",
              "--progress-bar-color": "transparent",
            } as CSSProperties
          }
        />
      ) : (
        <div className="project-stage-loading">
          <span className="loader-ring" />
          <div>
            <strong>Carregando visualização 3D</strong>
            <p>O modelo é carregado somente quando você abre o projeto.</p>
          </div>
        </div>
      )}

      {/* 4. Floating HUD controls */}
      {ready && !modelLoading && !modelError && (
        <>
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex gap-2">
            <button
              type="button"
              onClick={handleResetCamera}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-950/70 text-mineral-50 backdrop-blur shadow-premium transition hover:bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              title="Resetar câmera"
              aria-label="Resetar enquadramento do 3D"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                <path
                  d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-950/70 text-mineral-50 backdrop-blur shadow-premium transition hover:bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              title={isFullscreen ? "Sair de tela cheia" : "Tela cheia"}
              aria-label={isFullscreen ? "Sair de tela cheia" : "Abrir em tela cheia"}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                  <path
                    d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 w-max -translate-x-1/2 rounded-full border border-white/10 bg-ink-950/60 px-4 py-1.5 text-[11px] md:text-xs text-mineral-100/90 backdrop-blur shadow-premium md:bottom-4">
            Arraste para girar • Pinça ou role para aproximar
          </div>
        </>
      )}
    </div>
  );
}
