import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, UserRound } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Tim Medis", href: "#doctors" },
    { name: "Galeri", href: "#gallery" },
    { name: "Kontak", href: "#contact" },
  ];

  const waLink =
    "https://wa.me/6288975262351?text=Halo%20saya%20ingin%20booking%20perawatan%20di%20Sefya%20Dental%20Studio";

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-white/90 backdrop-blur-xl border-slate-200 py-4 shadow-sm" : "bg-transparent border-transparent py-6"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/20 transition-colors">
              <img
                src="/logo.jpg"
                alt="Logo Sefya Dental Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-montserrat text-lg font-bold tracking-tight text-[#0f172a]`}
            >
              Sefya Dental Studio
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm font-medium text-[#64748b] hover:text-[#ff91a4] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-slate-300 pl-8">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-[#64748b] hover:text-[#ff91a4] transition-colors"
              >
                <UserRound size={16} />
                <span>Masuk</span>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm shadow-rose-500/20"
              >
                <Phone size={16} />
                <span>Buat Janji</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#475569] hover:text-[#0f172a] p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 py-6 px-4 flex flex-col gap-6 shadow-2xl">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="block text-base font-medium text-[#64748b] hover:text-[#ff91a4] px-2"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-px bg-slate-200 w-full"></div>
          <div className="flex flex-col gap-4 px-2">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-[#475569] hover:text-[#ff91a4] font-medium py-3 border border-slate-200 rounded-xl transition-colors"
            >
              <UserRound size={18} />
              <span>Masuk</span>
            </Link>
            <a
              target="_blank"
              rel="noreferrer"
              href={waLink}
              className="flex items-center justify-center gap-2 bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 text-white py-3 rounded-xl font-semibold transition-all shadow-sm shadow-rose-500/20"
            >
              <Phone size={18} />
              <span>Booking via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
