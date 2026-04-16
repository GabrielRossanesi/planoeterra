import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "@google/model-viewer";

type ModelViewerElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  poster?: string;
  alt?: string;
  orientation?: string;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "field-of-view"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "camera-controls"?: boolean | string;
  "auto-rotate"?: boolean | string;
  "auto-rotate-delay"?: string;
  "interaction-prompt-threshold"?: string;
  "touch-action"?: string;
  "shadow-intensity"?: string;
  exposure?: string;
  loading?: string;
  "environment-image"?: string;
  "interaction-prompt"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

export {};
