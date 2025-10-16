'use client';

import { useCallback, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onFileAccepted: (file: File) => void;
  className?: string;
  children?: ReactNode; // <-- tambah: biar bisa custom isi
};

export default function DropzoneCard({ onFileAccepted, className = '', children }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return;
    onFileAccepted(acceptedFiles[0]);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxSize: 15 * 1024 * 1024, // 15MB
    multiple: false,
    onDrop
  });

  const errorText = fileRejections?.[0]?.errors?.[0]?.message;

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer ${className}`}
      aria-label="Upload zone"
    >
      <input {...getInputProps()} />
      {/* jika user kasih children, pakai itu; kalau tidak, fallback default */}
      {children ? (
        children
      ) : (
        <div className={`w-full h-72 border-2 border-dashed rounded-lg flex items-center justify-center
          ${isDragActive ? 'border-white' : 'border-neutral-300'}`}>
          <div className="text-center select-none">
            <div className="opacity-80">Drag & Drop or <span className="underline">Choose File</span> to upload</div>
            <div className="text-xs text-neutral-300 mt-2">PNG / JPG / JPEG — max 15MB</div>
            {errorText && <div className="text-red-300 text-xs mt-2">{errorText}</div>}
          </div>
        </div>
      )}
      {errorText && children && (
        <div className="text-red-400 text-xs mt-2">{errorText}</div>
      )}
    </div>
  );
}
