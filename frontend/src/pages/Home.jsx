import React, { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SEO from "../components/SEO";

const About = lazy(() => import("../components/About"));
const Doctors = lazy(() => import("../components/Doctors"));
const Gallery = lazy(() => import("../components/Gallery"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-opensans selection:bg-[#ff91a4] selection:text-white relative z-0 overflow-x-hidden">
      <SEO />

      {/* Premium Medical Light Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center bg-[#f8fafc]">
        {/* Subtle grid pattern with radial fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_100%)] opacity-60"></div>

        {/* Top centralized ambient glow - soft pink */}
        <div className="absolute top-[-10%] md:top-[-20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] h-[500px] md:h-[700px] bg-gradient-to-b from-[#ff91a4]/10 via-[#f472b6]/5 to-transparent blur-[80px] md:blur-[120px] rounded-full"></div>

        {/* Accent glowing orbs for depth - pink */}
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-[#ff91a4]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-[#f472b6]/5 blur-[150px] rounded-full"></div>
      </div>

      {/* Top edge highlight for premium feel */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff91a4]/30 to-transparent z-50"></div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Suspense
          fallback={
            <div className="h-96 flex flex-col items-center justify-center gap-6 w-full">
              {/* Modern double-ring loader */}
              <div className="relative flex items-center justify-center w-12 h-12">
                <div className="absolute inset-0 rounded-full border-t-2 border-[#ff91a4] animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-[#ff91a4]/20 animate-[spin_1.5s_reverse_infinite]"></div>
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                Memuat Modul...
              </span>
            </div>
          }
        >
          <div className="w-full flex flex-col">
            <About />
            <Doctors />
            <Gallery />
            <Contact />
          </div>
        </Suspense>
      </main>

      <Suspense
        fallback={
          <div className="h-32 w-full bg-[#f8fafc] border-t border-slate-200"></div>
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
