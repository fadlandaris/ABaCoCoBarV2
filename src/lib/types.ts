export type Detection = {
  cx: number; // center x
  cy: number; // center y
  r: number;  // radius px
  score?: number;
};

export type ScanResponse = {
  count: number;
  detections: Detection[];
  annotated_image: string; // data:image/png;base64,....
  processing_ms: number;
  model_meta: { model: string; conf?: number; iou?: number };
  warnings?: string[];
};
