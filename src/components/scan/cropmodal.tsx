'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import Btn from '../reusable/btn';

type Props = {
  file: File | null;
  open: boolean;
  onClose: () => void;
  onCropped: (blob: Blob) => void;
};

export default function CropModal({ file, open, onClose, onCropped }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    if (!imageUrl || !croppedAreaPixels) return;

    const image = await createImage(imageUrl);
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gambar hasil crop persegi dulu
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

    // Buat masking lingkaran
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = canvas.width;
    circleCanvas.height = canvas.height;
    const cctx = circleCanvas.getContext('2d');
    if (!cctx) return;

    cctx.beginPath();
    cctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2,
      0,
      Math.PI * 2
    );
    cctx.closePath();
    cctx.fill();
    cctx.globalCompositeOperation = 'source-in';
    cctx.drawImage(canvas, 0, 0);

    circleCanvas.toBlob((blob) => {
      if (blob) onCropped(blob);
      onClose();
    }, 'image/png', 0.9);
  }, [croppedAreaPixels, imageUrl, onClose, onCropped]);

  if (!open || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[100vw] h-[60vh] max-w-4xl relative overflow-hidden">
        <div className="absolute inset-0">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            cropShape="rect"
            showGrid={false}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>
        <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-1/3 cursor-pointer"
          />
          <div className="flex gap-3 items-center">
            <Btn value={'Close'} variant={true} onClick={onClose}/>
            <Btn value={'Crop'} onClick={createCroppedImage}/>
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
