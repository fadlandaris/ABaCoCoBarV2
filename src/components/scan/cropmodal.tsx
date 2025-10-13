'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

type Props = {
  file: File | null;
  open: boolean;
  onClose: () => void;
  onCropped: (blob: Blob) => void; // kirim hasil crop ke parent
};

export default function CropModal({ file, open, onClose, onCropped }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onCropComplete = useCallback((_area: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    const image = await createImage(imageUrl);
    const canvas = document.createElement('canvas');

    // kita buat crop berbentuk lingkaran (mendekati cawan petri)
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d')!;

    // gambar hasil crop persegi dulu
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    // masking lingkaran
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = canvas.width;
    circleCanvas.height = canvas.height;
    const cctx = circleCanvas.getContext('2d')!;
    cctx.beginPath();
    cctx.arc(canvas.width/2, canvas.height/2, Math.min(canvas.width, canvas.height)/2, 0, Math.PI*2);
    cctx.closePath();
    cctx.fill();
    cctx.globalCompositeOperation = 'source-in';
    cctx.drawImage(canvas, 0, 0);

    circleCanvas.toBlob((blob) => {
      if (blob) onCropped(blob);
      onClose();
    }, 'image/png', 1);
  }, [croppedAreaPixels, imageUrl, onClose, onCropped]);

  if (!open || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-xl p-4 w-[90vw] h-[80vh] max-w-4xl relative">
        <div className="absolute inset-0">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}              // square crop → lalu kita mask jadi circle
            onCropChange={setCrop}
            onZoomChange={setZoom}
            cropShape="rect"        // mask circle dilakukan manual agar hasil PNG transparan
            showGrid={false}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={e => setZoom(Number(e.target.value))} className="w-1/2" />
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600">Cancel</button>
            <button onClick={createCroppedImage} className="px-4 py-2 rounded bg-white text-black hover:bg-neutral-200">Use Crop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}
