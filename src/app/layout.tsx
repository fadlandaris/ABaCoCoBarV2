import { Figtree, Courier_Prime } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {  ToastContainer } from "react-toastify";
import Navbar from "@/components/reusable/navbar";
import SmoothScroll from "./animations/SmoothScroll";
import Logo from "@/components/reusable/logo";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree", 
  weight: ["400", "500", "600", "700"], 
})

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: ["400", "700"], 
});

export const metadata = {
  title: "ABaCoCoBar • Bacteria Scanner",
  description: "Next.js + Tailwind + Figtree",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${figtree.variable} ${courierPrime.variable} antialiased font-primary font-semibold tracking-tighter`}>
          <SmoothScroll>
            <Logo/>
            <Navbar/>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" 
              />
              {children}
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
