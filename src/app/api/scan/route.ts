import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const RF_API_KEY = process.env.ROBOFLOW_API_KEY!;
const RF_MODEL_URL = process.env.ROBOFLOW_MODEL_URL!; 
// contoh: https://detect.roboflow.com/bacteria-colony-yolo-ww4ba/2

export async function POST(req: Request) {
  const t0 = Date.now();

  try {
    const form = await req.formData();

    // ambil file dari client (hasil crop atau asli)
    const file = form.get('file') as Blob | File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // ambil params opsional dari client (conf & iou)
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

    // ---------- 1) panggil Roboflow untuk dapatkan JSON (prediksi) ----------
    const jsonForm = new FormData();
    jsonForm.append('file', file, 'image.png');

    const jsonUrl =
      `${RF_MODEL_URL}?api_key=${encodeURIComponent(RF_API_KEY)}` +
      `&confidence=${conf}` +
      `&overlap=${iou}`; // overlap ~ IOU

    const rfJsonRes = await fetch(jsonUrl, {
      method: 'POST',
      body: jsonForm,
    });

    if (!rfJsonRes.ok) {
      const text = await rfJsonRes.text();
      return NextResponse.json({ error: `Roboflow JSON error: ${text}` }, { status: 500 });
    }

    const rfJson = await rfJsonRes.json() as {
      predictions?: Array<{ x:number; y:number; width:number; height:number; class:string; confidence:number }>
      image?: { width:number; height:number }
    };

    const count = rfJson?.predictions?.length ?? 0;

    // ---------- 2) panggil Roboflow lagi untuk annotated image ----------
    // format=image akan mengembalikan PNG bytes dengan bounding boxes
    const imgForm = new FormData();
    imgForm.append('file', file, 'image.png');

    const imgUrl =
      `${RF_MODEL_URL}?api_key=${encodeURIComponent(RF_API_KEY)}` +
      `&confidence=${conf}` +
      `&overlap=${iou}` +
      `&format=image` +     // <- penting, biar balik gambar
      `&labels=on` +        // tampilkan label kelas
      `&stroke=2`;          // ketebalan garis box

    const rfImgRes = await fetch(imgUrl, {
      method: 'POST',
      body: imgForm,
    });

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
      model_meta: {
        model: 'Roboflow Hosted (Object Detection)',
        conf,
        iou,
      },
      // kalau kamu mau pakai koordinatnya nanti:
      predictions: rfJson?.predictions ?? [],
      warnings: [],
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
