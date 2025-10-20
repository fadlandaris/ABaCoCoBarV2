'use client'

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { guideData } from "@/data/data";
import cloudBg from "../../public/assets/cloud.png";
import Image, { StaticImageData } from "next/image";

interface GuideItem {
  id: number;
  title: string;
  icon: React.ElementType;
  image: StaticImageData;
  color: string;
  baseRotateZ?: number;
}

interface CursorState {
  x: number;
  y: number;
  ready: boolean;
}

const CursorContext = createContext<CursorState>({ x: 0, y: 0, ready: false });
const useCursor = () => useContext(CursorContext);

function TiltCard({ item }: { item: GuideItem }) {
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
        className={`group w-[260px] sm:w-[300px] md:w-[320px] lg:w-[350px]
        h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px]
        rounded-xl cursor-pointer select-none [transform-style:preserve-3d]
        transition-[box-shadow,filter] duration-200 ease-out shadow-xl hover:shadow-2xl`}
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

        {/* Card content */}
        <div
          className="absolute inset-0 p-4 sm:p-5 md:p-6 border border-neutral-700 bg-gradient-to-b from-neutral-900/90 to-foreground rounded-2xl overflow-hidden flex flex-col justify-between"
          style={{ transform: "translateZ(70px)" }}
        >
          <Image src={cloudBg} alt="" fill className="object-cover opacity-30" />
          <div className="w-full h-full relative">
            <div className="flex items-center justify-center gap-x-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0">
              <div className="w-12 sm:w-16 md:w-20 h-6 sm:h-8 md:h-10 rounded-full blur-2xl" style={{ backgroundColor: item.color }} />
              <div className="w-12 sm:w-16 md:w-20 h-6 sm:h-8 md:h-10 rounded-full blur-2xl" style={{ backgroundColor: item.color }} />
            </div>
            <Image
              src={item.image}
              width={item.id === 4 ? 140 : 110}
              className={`${item.id === 3 ? "scale-x-[-1]" : ""} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10`}
              alt=""
            />
          </div>
          <div>
            <div className="text-white mb-2 sm:mb-3">
              {item.id === 4 ? (
                <Image src={item.icon as unknown as StaticImageData} alt="" width={50} />
              ) : (
                <item.icon size={22} weight="bold" />
              )}
            </div>
            <p className="text-white text-lg sm:text-xl tracking-tighter font-medium">{item.title}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 sm:mt-8 md:mt-3 text-center text-xs sm:text-sm text-neutral-400 font-secondary font-medium">
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
      <section className="max-w-7xl mx-auto relative border-x-[6px] border-neutral-300/20 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
        <div className="flex flex-col items-center">
          {/* Heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-medium tracking-tighter text-center leading-tight">
            <h1>Discover our flow</h1>
            <h1>to scan with ABaCoCobar</h1>
          </div>

          {/* Grid with better tablet scaling */}
          <div className="
            mt-16 sm:mt-20 md:mt-24
            grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
            gap-y-14 sm:gap-y-16 md:gap-y-20
            gap-x-6 sm:gap-x-8 md:gap-x-10
            w-full place-items-center
          ">
            {items.map((item, i) => (
              <TiltCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </CursorContext.Provider>
  );
}
