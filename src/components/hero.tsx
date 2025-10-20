'use client'
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import phoneCard from "../../public/assets/mobile.png"; 
import { heroData } from "@/data/data";
import heroBG from "../../public/assets/herobg.png";
import Btn from "./reusable/btn";

interface HeroItem {
  id: number;
  name: string;
  status: string;
  price: string;
  desc: string;
}

function FloatingCard({
item,
i,
scrollYProgress,
}: {
  item: HeroItem;
  i: number;
  scrollYProgress: MotionValue<number>;
}) {
  const position = [
    "left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 rotate-2",
    "left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 -rotate-2",
    "left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2 rotate-4",
    "left-1/2 -translate-x-1/2 top-[32%] -translate-y-1/2 rotate-2",
    "left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 -rotate-6",
    "left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2 ",
  ];

  const isLeft = i < 3;
  const initialX = isLeft ? 500 : -500;

  // ✅ Hook dipanggil di level atas (tidak di dalam map)
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, initialX * -1]),
    { stiffness: 100, damping: 20 }
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`${position[item.id]} w-[320px] h-[68px] absolute rounded-xl z-10 text-black flex items-center justify-between py-3 px-4 bg-[#e6d9c9] font-secondary`}
      style={{ x, opacity }}
    >
      <div className="flex items-center gap-x-3">
        <div className="w-8 h-8 rounded-full bg-neutral-400" />
        <div>
          <p className="capitalize text-foreground font-medium text-lg">{item.name}</p>
          <p className="capitalize text-neutral-400 font-light">{item.status}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="capitalize text-foreground font-medium text-lg">{item.price}</p>
        <p className="capitalize text-neutral-400 font-light">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ✅ Semua hooks tetap di level atas function
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1200]), {
    stiffness: 100,
    damping: 20,
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), {
    stiffness: 100,
    damping: 20,
  });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), {
    stiffness: 100,
    damping: 20,
  });

  const height = useSpring(useTransform(scrollYProgress, [0, 1], [400, 600]), {
    stiffness: 100,
    damping: 20,
  });
  const width = useSpring(useTransform(scrollYProgress, [0, 1], [370, 600]), {
    stiffness: 100,
    damping: 20,
  });

  return (
    <section
      ref={ref}
      className="border-r-6 border-l-6 border-neutral-300/20 max-w-7xl mx-auto text-foreground relative overflow-hidden"
    >
      <div className="w-full h-[20vh] sm:h-[25vh] relative">
        <Image src={heroBG} className="inset-0 absolute" fill alt="" />
      </div>

      {/* Bagian teks */}
      <motion.div
        style={{ y, scale, opacity }}
        className="text-4xl sm:text-7xl font-semibold capitalize text-center sm:font-medium tracking-tighter mb-10 z-0"
      >
        <h1>Automated Bacterial</h1>
        <h1>Colony Counter</h1>
        <h1>With Barcode</h1>
      </motion.div>

      {/* Phone card */}
      <div className="w-full h-[565px] sm:h-[695px] relative">
        <div className="rounded-full bg-background absolute top-8 left-1/2 -translate-x-1/2 z-20 p-6 blur-2xl opacity-0 sm:opacity-100">
          <motion.div
            className="bg-[#ff9a82] rounded-full sm:w-[370px] sm:h-[400px]"
            style={{ height, width }}
          />
        </div>

        <Image
          src={phoneCard}
          alt="phone"
          className="absolute left-1/2 -translate-x-1/2 border z-20 w-[300px] sm:w-[370px]"
        />

        {heroData.map((item, i) => (
          <FloatingCard
            key={i}
            item={item}
            i={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="w-full relative bg-background pt-12 pb-12 sm:pb-24">
        <div className="text-center text-neutral-500 text-[18px]">
          <p>From upload to scanning — explore every</p>
          <p>corner of the bacteria universe with ease</p>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Btn value={"Scan now"} />
        </div>
      </div>
    </section>
  );
}
