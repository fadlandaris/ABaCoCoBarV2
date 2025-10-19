'use client'

import React, { useMemo, useRef, useState, useEffect, createContext, useContext } from "react";
import { guideData } from "@/data/data";
import cloudBg from "../../public/assets/cloud.png";
import Image from "next/image";

// --- Tipe data untuk guide item (kamu bisa sesuaikan sesuai data di "@/data/data") ---
interface GuideItem {
  id: number;
  title: string;
  icon: any;
  image: any;
  color: string;
  baseRotateZ?: number;
}

// --- Cursor context ---
interface CursorState {
  x: number;
  y: number;
  ready: boolean;
}
const CursorContext = createContext<CursorState>({ x: 0, y: 0, ready: false });
const useCursor = () => useContext(CursorContext);

// --- 3D Tilt Card ---
function TiltCard({ item, size = "w-[370px] h-[300px]" }: { item: GuideItem; size?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cursor = useCursor();
  const baseZ = item.baseRotateZ || 0;

  const transform = useMemo(() => {
    const el = ref.current;
    if (!el || !cursor.ready)
      return `perspective(900px) rotateX(0deg) rotateY(0deg) rotateZ(${baseZ}deg)`;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cursor.x - cx;
    const dy = cursor.y - cy;
    const norm = Math.sqrt(rect.width ** 2 + rect.height ** 2);
    const nx = dx / norm;
    const ny = dy / norm;

    const maxTilt = 16;
    const rx = -(ny * maxTilt);
    const ry = nx * maxTilt;
    return `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${baseZ}deg)`;
  }, [cursor.x, cursor.y, cursor.ready, baseZ]);

  const glareStyle = useMemo(() => {
    const el = ref.current;
    if (!el || !cursor.ready) return { background: "", opacity: 0 };
    const rect = el.getBoundingClientRect();
    const px = ((cursor.x - rect.left) / rect.width) * 100;
    const py = ((cursor.y - rect.top) / rect.height) * 100;
    return {
      background: `radial-gradient(350px circle at ${px}% ${py}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`,
      opacity: 1,
    };
  }, [cursor.x, cursor.y, cursor.ready]);

  return (
    <div className="relative" style={{ transform: `translateZ(0)` }}>
      <div
        ref={ref}
        style={{ transform }}
        className={`group ${size} rounded-xl cursor-pointer select-none [transform-style:preserve-3d] transition-[box-shadow,filter] duration-200 ease-out shadow-xl hover:shadow-2xl`}
      >
        <div className="absolute inset-0 rounded-2xl" style={{ transform: "translateZ(0px)" }} />
        <div
          style={{
            ...glareStyle,
            mixBlendMode: "screen",
            transform: "translateZ(60px)",
            transition: "background 120ms ease-out",
          }}
          className="absolute inset-0 pointer-events-none"
        />
        {/* content */}
        <div
          className="absolute inset-0 p-6 border border-neutral-700 bg-gradient-to-b from-neutral-900/90 to-foreground rounded-2xl overflow-hidden flex flex-col justify-between"
          style={{ transform: "translateZ(70px)" }}
        >
          <Image src={cloudBg} alt="" fill className="object-cover object-contain" />
          <div className="w-full h-full relative">
            <div className="flex items-center justify-center gap-x-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0">
              <div className="w-20 h-10 rounded-full blur-2xl" style={{ backgroundColor: item.color }} />
              <div className="w-20 h-10 rounded-full blur-2xl" style={{ backgroundColor: item.color }} />
            </div>
            <Image
              src={item.image}
              width={item.id === 4 ? 200 : 140}
              className={`${item.id === 3 ? "scale-x-[-1]" : ""} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10`}
              alt=""
            />
          </div>
          <div>
            <div className="text-white mb-3">
              {item.id === 4 ? (
                <Image src={item.icon} alt="" width={70} />
              ) : (
                <item.icon size={25} weight="bold" />
              )}
            </div>
            <p className="text-white text-xl tracking-tighter font-medium">{item.title}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-neutral-400 font-secondary font-medium">
        Step {item.id + 1}
      </p>
    </div>
  );
}

export default function Guide() {
  const items = useMemo(() => guideData as GuideItem[], []);
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, ready: false });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY, ready: true });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <CursorContext.Provider value={cursor}>
      <section className="max-w-7xl mx-auto relative border-r-6 border-l-6 pb-32 border-neutral-300/20">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-medium tracking-tighter text-center">
            <h1>Your comprehensive gateway</h1>
            <h1>to Bitcoin dapps and tools</h1>
          </div>
          <div className="mt-32 grid grid-cols-3 gap-y-24 w-full">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-center">
                <TiltCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </CursorContext.Provider>
  );
}
