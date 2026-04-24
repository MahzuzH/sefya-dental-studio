import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const waLink =
    "https://wa.me/6288975262351?text=Halo%20saya%20ingin%20booking%20perawatan%20di%20Sefya%20Dental%20Studio";

  // Framer motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center w-full"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="max-w-2xl flex flex-col items-start text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff91a4]/10 border border-[#ff91a4]/20 mb-8">
              <Sparkles size={14} className="text-[#ff91a4]" />
              <span className="text-xs font-semibold tracking-widest text-[#e11d48] uppercase">
                Layanan Gigi Premium
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#0f172a] leading-[1.1] mb-6 tracking-tighter">
              Wujudkan <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fb7185] via-[#ff91a4] to-[#f472b6]">
                Senyum Impian
              </span>
              <br className="hidden sm:block" /> Anda Bersama Kami
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-[#475569] mb-10 leading-relaxed max-w-lg">
              Nikmati perawatan gigi dengan dukungan teknologi modern dan
              suasana yang nyaman. Tim kami siap membantu anda untuk mendapatkan
              senyum yang sehat dan percaya diri.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 text-white min-w-[200px] px-8 py-4 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-rose-500/30"
              >
                <CalendarCheck size={20} />
                <span>Booking Sekarang</span>
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeUp} className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 w-full">
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
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <div className="relative hidden lg:flex justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-900/5 border border-slate-100 bg-white group"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Ruang Perawatan Klinik Gigi Modern"
                width="800"
                height="1000"
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, -10, 0], opacity: 1 }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6, delay: 0.8 } }}
                className="absolute bottom-8 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl shadow-rose-900/10 z-20 flex items-center gap-4 border border-slate-100"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;