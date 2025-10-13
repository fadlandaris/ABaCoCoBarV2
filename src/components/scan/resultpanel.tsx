'use client';

import { jsPDF } from 'jspdf';
import { ScanResponse } from '@/lib/types';
import { downloadDataUrl } from '@/lib/dataUrl';
import Image from "next/image";

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
    <div className="mt-6 p-4 rounded-lg bg-black/40">
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
        <button onClick={onDownloadPNG} className="px-4 py-2 rounded bg-white text-black hover:bg-neutral-200">Download PNG</button>
        <button onClick={onDownloadPDF} className="px-4 py-2 rounded bg-white text-black hover:bg-neutral-200">Download PDF</button>
        <button onClick={onReset} className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600">Scan Another</button>
      </div>
    </div>
  );
}
