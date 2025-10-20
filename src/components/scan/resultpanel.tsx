'use client';

import { jsPDF } from 'jspdf';
import { ScanResponse } from '@/lib/types';
import { downloadDataUrl } from '@/lib/dataUrl';
import Image from "next/image";
import { XCircleIcon } from '@phosphor-icons/react';
import Btn from '../reusable/btn';

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
    <div className='flex items-center justify-center'>
      <div>
        <p className='text-center mb-6'>Total : <span className="font-bold">{result.count} colonies</span></p>
        <div className="w-full overflow-auto">
          <Image
            src={result.annotated_image}
            alt="Annotated result"
            width={100}
            height={100}
            className="max-h-[40vh] object-contain w-auto h-auto rounded-full mx-auto"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <Btn value={'Reset'} onClick={onReset} variant={true}/>
          <Btn value={'PDF'} onClick={onDownloadPDF}/>
          <Btn value={'PNG'} onClick={onDownloadPNG}/>
        </div>
      </div>
    </div>
  );
}
