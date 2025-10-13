'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const fired = useRef(false)

  useEffect(() => {
    if (isLoaded && isSignedIn === false && !fired.current) {
      fired.current = true;
      toast.error("Harus login terlebih dahulu!", {
        toastId: "auth-required",
        style: {
          borderRadius: "12px",
          background: "linear-gradient(135deg,#ff4d4f,#ff7875)",
          color: "#fff",
          fontWeight: 500,
        },
      });
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded && !isSignedIn) return null;

  return (
    <main>
      {children}
    </main>
  );
}
