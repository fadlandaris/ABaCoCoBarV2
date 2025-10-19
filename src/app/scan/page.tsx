'use client';

import { useState } from 'react';
import DropzoneCard from '@/components/scan/dropzonecard';
import CropModal from '@/components/scan/cropmodal';
import ResultPanel from '@/components/scan/resultpanel';
import type { ScanResponse } from '@/lib/types';
import Image from 'next/image';
import Btn from '@/components/reusable/btn';
import { ScissorsIcon, ScanIcon, XCircleIcon, CircleNotchIcon } from '@phosphor-icons/react';

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
    <section className="h-[100vh] p-12 pt-24"
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 p-6 px-12 flex justify-between items-center">
        <Btn value={'Back to Website'} variant={true}/>
        <Btn value={'Have Any Question'}/>
      </nav>

      <div className="w-full h-full flex flex-col justify-between relative">
        {/* perbaikan: gunakan from-transparent, via-transparent agar valid */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf9f5]" />

        {/* Title */}
        <div className="flex items-center justify-center">
          <p className="text-center py-2 px-4 rounded-full border inline-block text-sm border-neutral-300 tracking-tighter mb-3 font-medium text-secondary">
            ABaCoCoBar
          </p>
        </div>
        <h1 className="text-6xl font-semibold text-secondary tracking-tighter text-center mb-12">
          Scan Your Bacteria Image Here
        </h1>

        {/* KOTAK UTAMA */}
        <div
          className="border-t-2 border-l-2 border-r-2 w-full h-full rounded-t-2xl border-dashed max-w-5xl mx-auto border-neutral-400 flex justify-center items-center
                      hover:bg-gradient-to-b from-[#fbf9f5] via-[#f2fab8]/50 to-[#d1df5a]/50 transition-all duration-[600ms] cursor-pointer"
        >
          {/* STATE 1: BELUM ADA FILE & BELUM ADA HASIL → tampil Dropzone bergaya custom + ikon animasi */}
          {!file && !result && (
            <DropzoneCard
              onFileAccepted={onFileAccepted}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="relative">
                {/* IKON ANIMASI */}
                <div className="relative w-40 h-20 mx-auto mb-6">
                  
                </div>

                {/* TEKS */}
                <div className="tracking-tighter text-secondary text-center mb-1 font-medium flex items-center gap-x-1 justify-center">
                  Drag & drop an Image, or
                  <span className="relative inline-block group">
                    <span>browse</span>
                    {/* perbaikan: class tidak boleh 'group-hover:' kosong */}
                    <span className="absolute left-0 -bottom-0.5 opacity-0 w-0 h-[1px] bg-primary group-hover:w-full group-hover:opacity-100 transition-all duration-[600ms]" />
                  </span>
                </div>
                <p className="text-center text-secondary/30 tracking-tight">
                  Maximum 15Mb each image — PNG / JPG / JPEG
                </p>
              </div>
            </DropzoneCard>
          )}

          {/* STATE 2: SUDAH PILIH FILE, BELUM ADA HASIL → Preview + Actions */}
          {file && !result && (
            <div className="w-full max-w-3xl mx-auto relative">
              <div className="text-sm text-secondary/70 mb-2 text-center">
                Preview (you can re-open crop if needed)
              </div>
              <div className="flex justify-center">
                <Image
                  src={URL.createObjectURL(croppedBlob ?? file)}
                  alt="preview"
                  width={700}
                  height={700}
                  unoptimized
                  className="max-h-[40vh] object-contain"
                />
              </div>
              <div className="flex gap-3 mt-6 justify-center">
                <button onClick={() => setShowCrop(true)} className={`bg-secondary text-primary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
                  <div className='relative overflow-hidden'>
                    <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Re-Crop</p>
                    <p className='opacity-0'>Re-Crop</p>
                    <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Re-Crop</p>
                  </div>
                  <div>
                    <div className='relative overflow-hidden -rotate-45'>
                      <ScissorsIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
                      <ScissorsIcon className='opacity-0'/>
                      <ScissorsIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
                    </div>
                  </div>
                </button>
                <button onClick={onRunScan} disabled={processing} className={`bg-primary text-secondary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
                  <div className='relative overflow-hidden'>
                    <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'> {processing ? 'Scanning..' : 'Run Scan'}</p>
                    <p className='opacity-0'> {processing ? 'Scanning..' : 'Run Scan'}</p>
                    <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'> {processing ? 'Scanning..' : 'Run Scan'}</p>
                  </div>
                  <div>
                    <div className='relative overflow-hidden -rotate-45'>
                      {processing ? <CircleNotchIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all animate-spin' /> : <ScanIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>}
                      {processing ? <CircleNotchIcon className='opacity-0 ' /> : <ScanIcon className='opacity-0'/>}
                      {processing ? <CircleNotchIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300 animate-spin'/> : <ScanIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>}
                    </div>
                  </div>
                </button>
                <button  onClick={resetAll} disabled={processing} className={`bg-fourth text-secondary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
                  <div className='relative overflow-hidden'>
                    <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Reset</p>
                    <p className='opacity-0'> Reset</p>
                    <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Reset</p>
                  </div>
                  <div>
                    <div className='relative overflow-hidden -rotate-45'>
                      <XCircleIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
                      <XCircleIcon className='opacity-0'/>
                      <XCircleIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
                    </div>
                  </div>
                </button>
              </div>

              {/* {processing && (
                <div className="absolute inset-0 bg-black/50">
                  <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  <div>Preprocessing… YOLO inferencing… Post-processing…</div>
                </div>
              )} */}

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
      </div>

      {/* Crop Modal */}
      <CropModal
        file={file}
        open={showCrop}
        onClose={() => setShowCrop(false)}
        onCropped={(blob) => setCroppedBlob(blob)}
      />
    </section>
  );
}
