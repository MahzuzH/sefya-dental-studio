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
    <div className="min-h-screen bg-[#fafafa] text-[#000000] font-opensans selection:bg-[#ff91a4] selection:text-white relative z-0 overflow-x-hidden">
      <SEO />

      {/* Premium Medical Light Background - Inspired by Logo Palette (Black + Pink + Gray) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none flex items-center justify-center bg-[#fafafa]">
        {/* Subtle grid pattern with radial fade - using logo gray */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_100%)] opacity-60"></div>

        {/* Top centralized ambient glow - brand pink */}
        <div className="absolute top-[-10%] md:top-[-20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] h-[500px] md:h-[700px] bg-gradient-to-b from-[#ff91a4]/10 via-[#ff91a4]/5 to-transparent blur-[80px] md:blur-[120px] rounded-full"></div>

        {/* Accent glowing orbs for depth */}
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-[#000000]/[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-[#ff91a4]/5 blur-[150px] rounded-full"></div>
      </div>

      {/* Top edge highlight for premium feel */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff91a4]/30 to-transparent z-50"></div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Suspense
          fallback={
            <phantom-ui loading animation="shimmer">
              <div className="w-full space-y-16 py-16 px-4">
                <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                  <div className="h-64 bg-slate-100 rounded-2xl" />
                  <div className="space-y-4">
                    <div className="h-8 w-48 bg-slate-100 rounded" />
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  </div>
                </section>
                <section className="max-w-6xl mx-auto text-center">
                  <div className="h-8 w-32 bg-slate-100 rounded mx-auto mb-8" />
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="h-64 bg-slate-100 rounded-2xl" />
                    <div className="h-64 bg-slate-100 rounded-2xl" />
                    <div className="h-64 bg-slate-100 rounded-2xl" />
                    <div className="h-64 bg-slate-100 rounded-2xl" />
                  </div>
                </section>
                <section className="max-w-6xl mx-auto text-center">
                  <div className="h-8 w-32 bg-slate-100 rounded mx-auto mb-8" />
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="h-40 bg-slate-100 rounded-xl" />
                    <div className="h-40 bg-slate-100 rounded-xl" />
                    <div className="h-40 bg-slate-100 rounded-xl" />
                    <div className="h-40 bg-slate-100 rounded-xl" />
                    <div className="h-40 bg-slate-100 rounded-xl" />
                    <div className="h-40 bg-slate-100 rounded-xl" />
                  </div>
                </section>
                <section className="max-w-6xl mx-auto text-center">
                  <div className="h-8 w-32 bg-slate-100 rounded mx-auto mb-8" />
                  <div className="max-w-lg mx-auto space-y-4">
                    <div className="h-12 bg-slate-100 rounded-xl" />
                    <div className="h-12 bg-slate-100 rounded-xl" />
                    <div className="h-32 bg-slate-100 rounded-xl" />
                  </div>
                </section>
              </div>
            </phantom-ui>
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
          <phantom-ui loading animation="shimmer">
            <footer className="h-32 w-full bg-[#fafafa] border-t border-neutral-200 px-4 py-8">
              <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
              </div>
            </footer>
          </phantom-ui>
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
