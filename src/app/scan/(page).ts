 'use client';

import { useState } from 'react';
import DropzoneCard from '@/components/scan/dropzonecard';
import CropModal from '@/components/scan/cropmodal';
import ResultPanel from '@/components/scan/resultpanel';
import type { ScanResponse } from '@/lib/types';
import Image from "next/image";

export default function ScanPage() {
  // const bg = 'https://images.unsplash.com/photo-1617155093758-158e4e5dcfe9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0';
  const [file, setFile] = useState<File | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileAccepted = (f: File) => {
    setFile(f);
    setShowCrop(true);
    setResult(null);
    setError(null);
  };

  const onRunScan = async () => {
    if (!croppedBlob && !file) return;
    setProcessing(true);
    setError(null);
    setResult(null);
    try {
      // pakai hasil crop (lebih bersih & kecil). jika tak ada, kirim file asli
      const toSend = croppedBlob ?? file!;
      const form = new FormData();
      form.append('file', toSend, 'crop.png');
      // (opsional) kirim param
      form.append('params', JSON.stringify({ conf: 0.25, iou: 0.45 }));

    const res = await fetch('/api/scan', { method: 'POST', body: form });
    if (!res.ok) {
      const text = await res.text(); // tampilkan pesan asli dari server (mis. env kurang, dll.)
      throw new Error(`Server error: ${res.status} – ${text}`);
    }
    const data = (await res.json()) as ScanResponse;

      setResult(data);
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'Failed to scan image';
      setError(err);
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setCroppedBlob(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full min-h-screen p-12 pt-24 bg-center bg-cover relative text-white border">
      <div className="relative shadow w-full min-h-[80vh] rounded-xl bg-gradient-to-b from-white/20 backdrop-blur-md to-neutral-300/20 p-6 flex flex-col">
        <div className="mb-4 text-lg font-medium flex items-center gap-2">
          <span>🧫</span> <span>Add Bacteria Photo Here</span>
        </div>

        {!file && <DropzoneCard onFileAccepted={onFileAccepted} />}

        {file && !result && (
          <div className="mt-4">
            <div className="text-sm opacity-80 mb-2">Preview (you can re-open crop if needed)</div>
            <Image
              src={URL.createObjectURL(croppedBlob ?? file)}
              alt="preview"
              width={500}
              height={500}
              unoptimized
              className="max-h-[40vh] rounded border border-white/10 object-contain"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCrop(true)} className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600">
                Re-Crop
              </button>
              <button onClick={onRunScan} disabled={processing} className="px-4 py-2 rounded bg-white text-black hover:bg-neutral-200 disabled:opacity-60">
                {processing ? 'Scanning...' : 'Run Scan'}
              </button>
              <button onClick={resetAll} className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600">Reset</button>
            </div>
          </div>
        )}

        {processing && (
          <div className="mt-8 flex items-center gap-3 text-sm">
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <div>Preprocessing… YOLO inferencing… Post-processing…</div>
          </div>
        )}

        {error && <div className="mt-4 text-red-300 text-sm">{error}</div>}

        {result && <ResultPanel result={result} onReset={resetAll} />}

        {/* crop modal */}
        <CropModal
          file={file}
          open={showCrop}
          onClose={() => setShowCrop(false)}
          onCropped={(blob) => setCroppedBlob(blob)}
        />
      </div>
    </div>
  );
}
