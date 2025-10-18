'use client'
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import phoneCard from "../../public/assets/mobile.png"; 
import { heroData } from "@/data/data";
import heroBG from "../../public/assets/herobg.png"
import Btn from "./reusable/btn";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section ref={ref} className="border-r-6 border-l-6 border-neutral-300/20 max-w-7xl mx-auto text-foreground relative overflow-hidden">
      <div className="w-full h-[25vh] w-full relative">
        <Image src={heroBG} className="inset-0 absolute" fill  alt={""} />
      </div>

      {/* Bagian teks */}
      <motion.div
      style={{
        y: useSpring(useTransform(scrollYProgress, [0, 1], [0, 1200]), { stiffness: 100, damping: 20 }),
        scale: useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), { stiffness: 100, damping: 20 }),
        opacity: useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), { stiffness: 100, damping: 20 }), 
      }}
      className="text-7xl capitalize text-center font-medium tracking-tighter mb-10 z-0">
        <h1>Automated Bacterial</h1>
        <h1>Colony Counter</h1>
        <h1>With Barcode</h1>
      </motion.div>

      {/* Phone card */}
      <div className="w-full h-[695px] relative">
        <div className="rounded-full bg-background absolute top-8 left-1/2 -translate-x-1/2 z-20 p-6 blur-2xl">
          <motion.div className="bg-[#ff9a82] rounded-full w-[370px] h-[400px]"
          style={{
            height: useSpring(useTransform(scrollYProgress, [0, 1], [400, 600]), { stiffness: 100, damping: 20 }),
            width: useSpring(useTransform(scrollYProgress, [0, 1], [370, 600]), { stiffness: 100, damping: 20 }),
          }}
          />
        </div>
        
        <Image src={phoneCard} alt="phone" width={370} className="absolute left-1/2 -translate-x-1/2 border z-20"/>
        {heroData.map((item, i) => {
          const position = [
            "left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 rotate-2",
            "left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 -rotate-2",
            "left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2 rotate-4",
            "left-1/2 -translate-x-1/2 top-[32%] -translate-y-1/2 rotate-2",
            "left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 -rotate-6",
            "left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2 ",
          ]
          const isLeft = i < 3;
          const initialX = isLeft ? 500 : -500;
          return (
            <motion.div key={i} className={`${position[item.id]} w-[320px] h-[68px] absolute rounded-xl z-10 text-black flex items-center justify-between py-3 px-4 bg-[#e6d9c9] font-secondary `}
            style={{ 
              x: useSpring( useTransform(scrollYProgress, [0, 1], [0, initialX * -1]), { stiffness: 100, damping: 20 }),
              opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
            }}>
              <div className="flex items-center gap-x-3">
                <div className="w-8 h-8 rounded-full bg-neutral-400"/>
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
          )
        })}
      </div>
      <div className="w-full relative bg-background pt-12 pb-24">
        <div className="text-center text-neutral-500 text-[18px]">
          <p>From transactions to dapps — explore every </p>
          <p>corner of the Bitcoin universe with ease.</p>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Btn value={"Scan now"}/>
        </div>
      </div>
    </section>
  );
}
