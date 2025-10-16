'use client';

import { jsPDF } from 'jspdf';
import { ScanResponse } from '@/lib/types';
import { downloadDataUrl } from '@/lib/dataUrl';
import Image from "next/image";
import { XCircleIcon } from '@phosphor-icons/react';

type Props = {
  result: ScanResponse | null;
  onReset: () => void;
};

export default function ResultPanel({ result, onReset }: Props) {
  if (!result) return null;

  const onDownloadPNG = () => {
    downloadDataUrl(result.annotated_image, `colony-annotated-${Date.now()}.png`);
  };

  const onDownloadPDF = async () => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    pdf.setFontSize(16);
    pdf.text('Bacteria Colony Detection Report', 40, 50);
    pdf.setFontSize(11);
    pdf.text(`Detected colonies: ${result.count}`, 40, 80);
    pdf.text(`Model: ${result.model_meta.model}`, 40, 100);
    if (result.model_meta.conf !== undefined) pdf.text(`conf: ${result.model_meta.conf}`, 40, 120);
    if (result.model_meta.iou !== undefined) pdf.text(`iou: ${result.model_meta.iou}`, 140, 120);
    pdf.text(`Processing time: ${result.processing_ms} ms`, 40, 140);
    if (result.warnings?.length) pdf.text(`Warnings: ${result.warnings.join(', ')}`, 40, 160);

    // embed image (scale agar muat A4)
    const imgWidth = 520;
    const imgHeight = 520;
    pdf.addImage(result.annotated_image, 'PNG', 40, 190, imgWidth, imgHeight);
    pdf.save(`colony-report-${Date.now()}.pdf`);
  };

  return (
    <div className="mt-6 p-4 rounded-lg ">
      <div className="text-lg font-semibold mb-2">Result</div>
      <div className="text-sm opacity-90 mb-4">Total colonies: <span className="font-bold">{result.count}</span></div>
      <div className="w-full overflow-auto">
        {/* tampilkan annotated image */}
        <Image
          src={result.annotated_image}
          alt="Annotated result"
          width={520}
          height={520}
          className="max-h-[60vh] rounded-lg border border-white/10 object-contain w-auto h-auto"
        />
      </div>
      <div className="flex gap-3 mt-4">
      <button onClick={onReset} className={`bg-secondary text-primary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
        <div className='relative overflow-hidden'>
          <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Scan Another</p>
          <p className='opacity-0'>Scan Another</p>
          <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Scan Another</p>
        </div>
        <div>
          <div className='relative overflow-hidden -rotate-45'>
            <XCircleIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
            <XCircleIcon className='opacity-0'/>
            <XCircleIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
          </div>
        </div>
      </button>
      <button onClick={onDownloadPDF} className={`bg-primary text-secondary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
        <div className='relative overflow-hidden'>
          <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Download PDF</p>
          <p className='opacity-0'>Download PDF</p>
          <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Download PDF</p>
        </div>
        <div>
          <div className='relative overflow-hidden -rotate-45'>
            <XCircleIcon className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'/>
            <XCircleIcon className='opacity-0'/>
            <XCircleIcon className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'/>
          </div>
        </div>
      </button>
      <button onClick={onDownloadPNG} className={`bg-fourth text-secondary flex items-center gap-x-2 rounded-full py-3 px-6 text-sm tracking-tighter overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500`}>
        <div className='relative overflow-hidden'>
          <p className='absolute top-1/2 opacity-100 -translate-y-1/2 group-hover:-top-2 group-hover:opacity-0 duration-300 transition-all'>Download PNG</p>
          <p className='opacity-0'>Download PNG</p>
          <p className='absolute top-1/2 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 transition-all duration-300'>Download PNG</p>
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
    </div>
  );
}
