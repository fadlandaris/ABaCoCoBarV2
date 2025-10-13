'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onFileAccepted: (file: File) => void;
};

export default function DropzoneCard({ onFileAccepted }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return;
    const file = acceptedFiles[0];
    onFileAccepted(file);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 15 * 1024 * 1024, // 15MB
    multiple: false,
    onDrop
  });

  const errorText = fileRejections?.[0]?.errors?.[0]?.message;

  return (
    <div
      {...getRootProps()}
      className={`w-full h-72 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
      ${isDragActive ? 'border-white' : 'border-neutral-300'}`}
      aria-label="Upload zone"
    >
      <input {...getInputProps()} />
      <div className="text-center select-none">
        <div className="opacity-80">Drag & Drop or <span className="underline">Choose File</span> to upload</div>
        <div className="text-xs text-neutral-300 mt-2">PNG / JPG / JPEG — max 15MB</div>
        {errorText && <div className="text-red-300 text-xs mt-2">{errorText}</div>}
      </div>
    </div>
  );
}
