import React from "react";
import { Camera, ZoomIn } from "lucide-react";

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Peralatan Modern",
      category: "Fasilitas",
    },
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Ruang Tunggu Nyaman",
      category: "Fasilitas",
    },
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Senyum Pasien",
      category: "Hasil Perawatan",
    },
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Konsultasi Dokter",
      category: "Pelayanan",
    },
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Interior Klinik",
      category: "Fasilitas",
    },
    {
      url: "https://images.unsplash.com/photo-1629909606604-4a1511634442?auto=format&fit=crop&q=80&w=800",
      title: "Teknologi Terkini",
      category: "Fasilitas",
    },
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-transparent border-b border-slate-200 relative overflow-hidden"
    >
      <style>
        {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
                `}
      </style>

      <div className="container mx-auto px-4 md:px-6 mb-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff91a4] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-[#0f172a] uppercase">
              Galeri Kami
            </span>
          </div>
          <h2 className="font-roboto text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 relative inline-block">
            <span className="text-[#ff91a4]">Galeri</span> Kami
          </h2>
          <p className="text-[#64748b] text-lg">
            Lihat lebih dekat kenyamanan fasilitas dan dedikasi kami dalam
            menghadirkan senyum sehat bagi setiap pasien.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative group/marquee">
        <div className="animate-marquee gap-6 md:gap-8 px-4">
          {/* Double the images for seamless loop */}
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl w-[300px] md:w-[400px] aspect-[4/3] border border-slate-200 bg-white shadow-lg hover:shadow-xl hover:shadow-[#ff91a4]/20 transition-all duration-500 cursor-pointer group shrink-0"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#ff91a4]/20 border border-[#ff91a4]/30 text-[#ff91a4] text-xs font-semibold mb-3 backdrop-blur-md">
                    {image.category}
                  </span>
                  <h3 className="text-[#0f172a] text-xl font-bold mb-1 flex items-center gap-2">
                    {image.title}
                    <ZoomIn
                      size={18}
                      className="text-[#ff91a4] opacity-0 group-hover:opacity-100 transition-opacity delay-200"
                    />
                  </h3>
                </div>
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera size={16} className="text-[#0f172a]" />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Action Suggestion */}
      <div className="mt-16 text-center container mx-auto px-4">
        <p className="text-[#64748b] italic">
          "Kenyamanan Anda adalah prioritas utama kami di setiap langkah
          perawatan."
        </p>
      </div>
    </section >
  );
};

export default Gallery;
