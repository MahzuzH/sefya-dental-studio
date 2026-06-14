import React from "react";

const doctors = [
    {
        name: "drg. Sefya Firdaus",
        role: "Dokter Gigi",
        file: "sefya",
        accent: "bg-[#ff91a4]",
        textColor: "text-[#ff91a4]",
    },
    {
        name: "drg. Sarah Andintama",
        role: "Dokter Gigi",
        file: "sarah",
        accent: "bg-[#ff91a4]",
        textColor: "text-[#ff91a4]",
    },
    {
        name: "Vidia",
        role: "Asisten Dokter Gigi",
        file: "vidi",
        accent: "bg-green-500",
        textColor: "text-green-500",
    },
    {
        name: "Ika",
        role: "Asisten Dokter Gigi",
        file: "ika",
        accent: "bg-green-500",
        textColor: "text-green-500",
    },
    {
        name: "Maya",
        role: "Administrasi",
        file: "maya",
        accent: "bg-yellow-500",
        textColor: "text-yellow-500",
    },
];

const row1 = doctors.slice(0, 2);
const row2 = doctors.slice(2, 5);

function Img({ file, name }) {
    return (
        <picture>
            <source
                type="image/webp"
                srcSet={`/doctors/${file}-320.webp 320w, /doctors/${file}-640.webp 640w, /doctors/${file}-960.webp 960w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <img
                src={`/doctors/${file}-640.webp`}
                alt={name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
            />
        </picture>
    );
}

function Card({ doctor }) {
    return (
        <div className="group relative flex flex-col items-center w-full sm:w-[calc(50%-2rem)] lg:w-[calc(40%-2rem)] max-w-sm">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl transition-all duration-500 hover:border-[#ff91a4]/50 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent z-10" />
                <Img file={doctor.file} name={doctor.name} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-md px-3 py-1.5 border border-slate-200 shadow-sm mb-3">
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${doctor.accent} mr-2`}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0f172a]">
                            {doctor.role}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight leading-tight">
                        {doctor.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}

function CardSmall({ doctor }) {
    return (
        <div className="group relative flex flex-col items-center w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] max-w-xs">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl transition-all duration-500 hover:border-[#ff91a4]/50 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent z-10" />
                <Img file={doctor.file} name={doctor.name} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-md px-3 py-1.5 border border-slate-200 shadow-sm mb-3">
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${doctor.accent} mr-2`}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0f172a]">
                            {doctor.role}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight leading-tight">
                        {doctor.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default function Doctors() {
    return (
        <section
            id="doctors"
            className="py-24 relative w-full border-y border-slate-200"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#ff91a4] animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest text-[#0f172a] uppercase">
                            Kenali Tim Kami
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight">
                        Tim <span className="text-[#ff91a4]">Ahli</span> Kami
                    </h2>
                    <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl">
                        Tenaga profesional kami yang berpengalaman siap
                        memberikan perawatan terbaik sesuai kebutuhan Anda.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                        {row1.map((doctor, i) => (
                            <Card key={i} doctor={doctor} />
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                        {row2.map((doctor, i) => (
                            <CardSmall key={i} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
