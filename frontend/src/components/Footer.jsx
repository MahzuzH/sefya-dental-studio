import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-[#64748b] pt-16 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 border-b border-slate-200 pb-8 mb-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-[#0f172a] tracking-tight">
                Sefya Dental Studio
              </span>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed text-sm">
              Menghadirkan perawatan gigi premium, profesional, dan nyaman. Kami
              memberikan senyum terbaik bagi masyarakat dengan dedikasi sepenuh
              hati.
            </p>
          </div>

          <div>
            <h4 className="text-[#0f172a] font-semibold mb-6 text-sm">
              Tautan Lain
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#gallery"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Galeri
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Masuk Pasien
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#0f172a] font-semibold mb-6 text-sm">
              Menu Cepat
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#doctors"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Tim Medis
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#ff91a4] transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Sefya Dental Studio. Seluruh hak
          cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
