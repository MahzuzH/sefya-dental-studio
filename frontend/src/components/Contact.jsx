import React from "react";
import { MapPin, Phone, Clock, MessageSquareShare } from "lucide-react";

const Contact = () => {
  const waLink =
    "https://wa.me/6288975262351?text=Halo%20saya%20ingin%20booking%20perawatan%20di%20Sefya%20Dental%20Studio";

  return (
    <section id="contact" className="py-24 relative w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff91a4] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-[#0f172a] uppercase">
              Hubungi Kami
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">
            Lokasi & <span className="text-[#ff91a4]">Kontak</span>
          </h2>
          <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl">
            Punya pertanyaan atau ingin buat janji temu? Tim kami siap membantu
            Anda mewujudkan senyum impian.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col group">
            {/* Ambient Glow */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#ff91a4]/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

            <h3 className="text-2xl font-bold mb-8 text-[#0f172a] tracking-tight relative z-10">
              Informasi Kontak
            </h3>

            <div className="space-y-8 relative z-10 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#ff91a4]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-1">
                    Alamat Klinik
                  </h4>
                  <p className="text-[#64748b] text-sm leading-relaxed">
                    Jl. Subang Pamanukan,
                    <br />
                    Sukamulya, Kec. Pagaden,
                    <br />
                    Kabupaten Subang, Jawa Barat 41252
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#ff91a4]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-1">
                    Nomor Telepon
                  </h4>
                  <p className="text-[#64748b] text-sm">+62 889-7526-2351</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#ff91a4]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a] mb-1">
                    Jam Operasional
                  </h4>
                  <p className="text-[#64748b] text-sm leading-relaxed">
                    Setiap Hari
                    <br />
                    Pagi: 08:00 - 12:00
                    <br />
                    Sore: 15:00 - 20:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 relative z-10">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#ff91a4] hover:bg-[#fb7185] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md shadow-rose-500/20 active:scale-95"
              >
                <MessageSquareShare size={20} />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Real Google Maps Embed */}
          <div className="lg:col-span-3 min-h-[400px] bg-white border border-slate-200 shadow-xl relative rounded-[2rem] overflow-hidden p-2 flex">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
              {/* Optional dark mode overlay for map if preferred, left empty to show actual map */}
              <iframe
                title="Sefya Dental Studio Location Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126842.22030254555!2d107.82731097070311!3d-6.544477402279908!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69392ce35c6901%3A0xb85eae4e6bc6bab2!2sPraktik%20Dokter%20Gigi%20drg.%20Sefya%20Firdaus!5e0!3m2!1sen!2sid!4v1774529535689!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
