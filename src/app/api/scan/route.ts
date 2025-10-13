// app/api/scan/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
// cegah caching & masalah streaming body di prod
export const dynamic = 'force-dynamic';
// beri waktu cukup buat panggilan eksternal
export const maxDuration = 30;

const RF_API_KEY = process.env.ROBOFLOW_API_KEY;   // <-- tanpa "!"
const RF_MODEL_URL = process.env.ROBOFLOW_MODEL_URL;

export async function POST(req: Request) {
  const t0 = Date.now();

  // guard ENV di runtime, bukan saat module load
  if (!RF_API_KEY || !RF_MODEL_URL) {
    return NextResponse.json(
      { error: 'Missing ROBOFLOW_API_KEY or ROBOFLOW_MODEL_URL. Check Vercel Production env & redeploy.' },
      { status: 500 }
    );
  }

  try {
    const form = await req.formData();

    const file = form.get('file') as Blob | File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    let conf = 0.25;
    let iou = 0.45;
    const paramsRaw = form.get('params')?.toString();
    if (paramsRaw) {
      try {
        const p = JSON.parse(paramsRaw);
        if (typeof p.conf === 'number') conf = p.conf;
        if (typeof p.iou === 'number') iou = p.iou;
      } catch {}
    }

    // 1) JSON
    const jsonForm = new FormData();
    jsonForm.append('file', file, 'image.jpg');

    const jsonUrl =
      `${RF_MODEL_URL}?api_key=${encodeURIComponent(RF_API_KEY)}` +
      `&confidence=${conf}` +
      `&overlap=${iou}`;

    const rfJsonRes = await fetch(jsonUrl, { method: 'POST', body: jsonForm, cache: 'no-store' });
    if (!rfJsonRes.ok) {
      const text = await rfJsonRes.text();
      return NextResponse.json({ error: `Roboflow JSON error: ${text}` }, { status: 500 });
    }
    const rfJson = await rfJsonRes.json() as {
      predictions?: Array<{ x:number; y:number; width:number; height:number; class:string; confidence:number }>
    };
    const count = rfJson?.predictions?.length ?? 0;

    // 2) Annotated image
    const imgForm = new FormData();
    imgForm.append('file', file, 'image.jpg');

    const imgUrl =
      `${RF_MODEL_URL}?api_key=${encodeURIComponent(RF_API_KEY)}` +
      `&confidence=${conf}` +
      `&overlap=${iou}` +
      `&format=image&labels=on&stroke=2`;

    const rfImgRes = await fetch(imgUrl, { method: 'POST', body: imgForm, cache: 'no-store' });
    if (!rfImgRes.ok) {
      const text = await rfImgRes.text();
      return NextResponse.json({ error: `Roboflow image error: ${text}` }, { status: 500 });
    }

    const imgBuf = Buffer.from(await rfImgRes.arrayBuffer());
    const dataUrl = `data:image/png;base64,${imgBuf.toString('base64')}`;

    const processing_ms = Date.now() - t0;

    return NextResponse.json({
      count,
      annotated_image: dataUrl,
      processing_ms,
      model_meta: { model: 'Roboflow Hosted (Object Detection)', conf, iou },
      predictions: rfJson?.predictions ?? [],
      warnings: [],
    });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error }, { status: 500 });
  }
}
