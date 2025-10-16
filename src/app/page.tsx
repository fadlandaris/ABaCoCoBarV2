'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Footer from "@/components/footer";
import Flow from "@/components/flow";
import Contact from "@/components/contact";
import Navbar from "@/components/reusable/navbar";


const sections = [
  { id: 0, comp: <Hero /> },
  { id: 1, comp: <About /> },
  { id: 2, comp: <Services /> },
  { id: 3, comp: <Flow /> },
  { id: 4, comp: <Contact /> },
  { id: 5, comp: <Footer /> },
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSection = (index: number) => {
    if (isAnimating) return;
    setActiveIndex(index);
    setIsAnimating(true);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      if (e.deltaY > 0 && activeIndex < sections.length - 1) {
        setActiveIndex((prev) => prev + 1);
        setIsAnimating(true);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
        setIsAnimating(true);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar goToSection={goToSection} />
      {sections.map((s, i) => (
        <motion.section
          key={s.id}
          className="absolute inset-0 h-screen w-full"
          initial={{ y: `${(i - activeIndex) * 100}%` }}
          animate={{ y: `${(i - activeIndex) * 100}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {s.comp}
        </motion.section>
      ))}
    </div>
  );
}
