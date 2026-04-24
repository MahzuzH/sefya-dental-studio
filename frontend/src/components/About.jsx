import React from "react";
import { Microscope, Stethoscope, HeartHandshake, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Stethoscope size={24} className="text-[#ff91a4]" />,
      title: "Layanan Profesional",
      description:
        "Dokter gigi tersertifikasi kami siap memberikan perawatan berkualitas yang disesuaikan dengan kebutuhan Anda.",
    },
    {
      icon: <Microscope size={24} className="text-[#ff91a4]" />,
      title: "Alat Modern",
      description:
        "Didukung oleh teknologi medis terkini dan perlatan gigi modern untuk memastikan kenyamanan dan presisi.",
    },
    {
      icon: <HeartHandshake size={24} className="text-[#ff91a4]" />,
      title: "Perawatan Nyaman",
      description:
        "Nikmati suasana rileks yang dirancang untuk mengurangi rasa cemas selama kunjungan Anda.",
    },
    {
      icon: <Award size={24} className="text-[#ff91a4]" />,
      title: "Kualitas Terbaik",
      description:
        "Kami hanya menggunakan bahan berkualitas dan teknik teruji untuk hasil yang indah serta tahan lama.",
    },
  ];

  return (
    <section id="about" className="py-24 relative w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff91a4] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-[#0f172a] uppercase">
              Tentang Kami
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">
            Mengapa Memilih <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0f172a] via-[#ff91a4] to-[#fb7185]">
              Sefya Dental Studio?
            </span>
          </h2>
          <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl">
            Kami menghadirkan layanan perawatan gigi berkualitas dengan
            lingkungan yang nyaman dan pelayanan yang ramah.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md hover:shadow-lg hover:border-[#ff91a4]/50 transition-all duration-300 group flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#ff91a4]/10 group-hover:border-[#ff91a4]/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#64748b] leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-24 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 overflow-hidden relative shadow-xl flex flex-col md:flex-row items-center gap-12">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff91a4]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f472b6]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full md:w-1/2 relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-6 text-[#0f172a] tracking-tight">
              Berkomitmen pada <br />
              <span className="text-[#64748b]">Keunggulan Perawatan</span>
            </h3>
            <p className="text-[#64748b] mb-8 leading-relaxed text-lg">
              Di Sefya Dental Studio, kami percaya bahwa senyum sehat adalah
              senyum yang indah. Klinik kami hadir untuk memberikan layanan gigi
              yang transparan, etis, dan berkualitas tinggi.
            </p>
            <ul className="space-y-4">
              {[
                "Pemeriksaan Menyeluruh",
                "Prosedur Tanpa Rasa Sakit",
                "Biaya Perawatan Terjangkau",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-[#0f172a] font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ff91a4]/10 border border-[#ff91a4]/20 flex items-center justify-center text-[#ff91a4] text-xs font-bold">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative border border-slate-200 group">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=600"
              alt="Dental Equipment"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent flex items-end p-8 z-20">
              <p className="text-[#0f172a] font-medium text-sm md:text-base border-l-2 border-[#ff91a4] pl-4">
                Mesin sterilisasi modern untuk{" "}
                <br className="hidden md:block" /> menjamin keamanan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
