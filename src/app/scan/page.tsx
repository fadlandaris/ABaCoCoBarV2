'use client';

import { useState } from 'react';
import DropzoneCard from '@/components/scan/dropzonecard';
import CropModal from '@/components/scan/cropmodal';
import ResultPanel from '@/components/scan/resultpanel';
import type { ScanResponse } from '@/lib/types';
import Image from 'next/image';
import gridBG from "../../../public/assets/grid.png"
import { motion } from 'framer-motion';
import { PanoramaIcon } from '@phosphor-icons/react';
import Btn from '@/components/reusable/btn';

export default function ScanPage() {
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
      const toSend = croppedBlob ?? file!;
      const form = new FormData();
      form.append('file', toSend, 'crop.png');
      form.append('params', JSON.stringify({ conf: 0.25, iou: 0.45 }));

      const res = await fetch('/api/scan', { method: 'POST', body: form });
      if (!res.ok) {
        const text = await res.text();
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
    <section className=''>
      <div className="max-w-7xl mx-auto h-[30vh] relative border-r-6 border-l-6 border-neutral-300/20 flex items-end justify-center pb-6">
        <div className='w-100 sm:w-200 h-10 rounded-full bg-primary/40 absolute top-0 left-1/2 -translate-x-1/2 z-0 blur-2xl rotate-45'/>
        <div className='w-50 sm:w-140 h-10 rounded-full bg-primary/40 absolute top-0 sm:-top-12 left-1/2 -translate-x-1/2 z-0 blur-2xl -rotate-45'/>
        <Image src={gridBG} className="object-cover object-contain" fill  alt={""} />
        <div className='z-30 flex items-center justify-center'>
          <p className='p-2 px-3 rounded-full text-sm bg-[#f2efeb] text-[#4a4948]'>ABaCoCoBar</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto border-r-6 border-l-6 border-neutral-300/20 '>
        <div className='text-center text-3xl font-semibold sm:text-5xl sm:font-medium relative tracking-tighter'>
          <h1 className='relative'>Explore, upload, and scan</h1>
          <h1 className='relative'>Seemlessly <span>in the ABaCoCoBar</span></h1>
          <h1 className='relative'>ecosystem</h1>
        </div>
        <div className="min-h-[65vh] transition-all duration-600 border-t-2 border-l-2 border-r-2 rounded-3xl sm:rounded-t-[100px] border-dashed max-w-5xl sm:max-w-5xl mx-auto border-neutral-300 flex justify-center items-center bg-[#f2efeb] transition-all duration-600 cursor-pointer mt-12 group">
          {!file && !result && (
            <DropzoneCard onFileAccepted={onFileAccepted} className="relative w-full h-full flex items-center justify-center">
              <div>
                <div className="relative w-40 h-20 mx-auto">
                  <motion.div
                    className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-foreground`}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'easeInOut',
                    }}
                  >
                    <PanoramaIcon size={60} weight="fill" />
                  </motion.div>
                </div>

                {/* TEKS */}
                <div className="tracking-tighter text-secondary text-center mb-1 font-medium flex items-center gap-x-1 justify-center text-neutral-500">
                  Drag & drop an Image, or
                  <span className="relative inline-block">
                    <span className='text-primary'>browse</span>
                    <span className="absolute left-0 -bottom-0.5 opacity-0 w-0 h-[2px] rounded-full bg-primary group-hover:w-full group-hover:opacity-100 transition-all duration-[600ms]" />
                  </span>
                </div>
                <p className="text-center tracking-tight text-neutral-500 text-sm">
                  Maximum 15Mb each image — PNG / JPG / JPEG
                </p>
              </div>
            </DropzoneCard>
          )}

          {/* STATE 2: SUDAH PILIH FILE, BELUM ADA HASIL → Preview + Actions */}
          {file && !result && (
            <div className="">
              <div className="text-sm text-secondary/70 mb-2 text-center mb-6 text-neutral-500">
                Preview ( you can re-open crop if needed )
              </div>
              <div className="flex justify-center">
                <Image
                  src={URL.createObjectURL(croppedBlob ?? file)}
                  alt="preview"
                  width={500}
                  height={500}
                  unoptimized
                  className="max-h-[40vh] object-contain"
                />
              </div>
              <div className="flex gap-3 mt-6 justify-center">
                <Btn value="Re-crop" variant={true} onClick={() => setShowCrop(true)} />
                <Btn value={processing ? 'Scanning..' : 'Run Scan'} onClick={onRunScan} disabled={processing} processing={processing} />
                <Btn value="Reset" variant={true} onClick={resetAll} disabled={processing} />
              </div>

              {error && (
                <div className="mt-4 text-center text-red-500 text-sm">{error}</div>
              )}
            </div>
          )}

          {/* STATE 3: ADA HASIL → ResultPanel */}
          {result && (
            <div className="w-full max-w-4xl mx-auto p-6">
              <ResultPanel result={result} onReset={resetAll} />
            </div>
          )}
        </div>

        {/* Crop Modal */}
        <CropModal
          file={file}
          open={showCrop}
          onClose={() => setShowCrop(false)}
          onCropped={(blob) => setCroppedBlob(blob)}
        />
      </div>
    </section>
  );
}
