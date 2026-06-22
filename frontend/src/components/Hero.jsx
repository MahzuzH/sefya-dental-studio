import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";

const Hero = () => {
  const waLink =
    "https://wa.me/6288975262351?text=Halo%20saya%20ingin%20booking%20perawatan%20di%20Sefya%20Dental%20Studio";

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center w-full"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff91a4]/10 border border-[#ff91a4]/20 mb-8 animate-[fadeInUp_0.6s_ease-out]">
              <Sparkles size={14} className="text-[#ff91a4]" />
              <span className="text-xs font-semibold tracking-widest text-[#be123c] uppercase">
                Layanan Gigi Premium
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#0f172a] leading-[1.1] mb-6 tracking-tighter animate-[fadeInUp_0.6s_ease-out_0.15s_both]">
              Wujudkan <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fb7185] via-[#ff91a4] to-[#f472b6]">
                Senyum Impian
              </span>
              <br className="hidden sm:block" /> Anda Bersama Kami
            </h1>

            <p className="text-lg text-[#475569] mb-10 leading-relaxed max-w-lg animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              Nikmati perawatan gigi dengan dukungan teknologi modern dan
              suasana yang nyaman. Tim kami siap membantu anda untuk mendapatkan
              senyum yang sehat dan percaya diri.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-[fadeInUp_0.6s_ease-out_0.45s_both]">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 text-black min-w-[200px] px-8 py-4 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-rose-500/30"
              >
                <CalendarCheck size={20} />
                <span>Booking Sekarang</span>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 w-full animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div>
                <p className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">
                  3+
                </p>
                <p className="text-xs text-[#64748b] font-medium uppercase tracking-wider">
                  Tahun Pengalaman
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">
                  3.000+
                </p>
                <p className="text-xs text-[#64748b] font-medium uppercase tracking-wider">
                  Pasien Puas
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0f172a] mb-1 tracking-tight">
                  Modern
                </p>
                <p className="text-xs text-[#64748b] font-medium uppercase tracking-wider">
                  Alat & Teknologi
                </p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative hidden lg:flex justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-900/5 border border-slate-100 bg-white group animate-[fadeInScale_0.8s_ease-out_0.2s_both]">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <picture>
                <source
                  type="image/webp"
                  srcSet="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400&h=500&fm=webp 400w, https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=1000&fm=webp 800w, https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200&h=1500&fm=webp 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Ruang Perawatan Klinik Gigi Modern"
                  width="800"
                  height="1000"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </picture>

              {/* Floating Badge */}
              <div className="absolute bottom-8 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl shadow-rose-900/10 z-20 flex items-center gap-4 border border-slate-100 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-12 h-12 rounded-xl bg-[#ff91a4]/10 border border-[#ff91a4]/20 flex items-center justify-center text-[#ff91a4]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f172a] tracking-tight">
                    Terjamin 100%
                  </p>
                  <p className="text-xs text-[#64748b] font-medium">
                    Aman & Steril
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
