import React, { useCallback, useMemo, memo } from "react";
import {
    Info,
    CheckCircle2,
    AlertCircle,
    MapPin,
    Calendar,
    User,
    Search,
    Activity,
    Shield,
    FileText,
    Camera,
    Stethoscope,
} from "lucide-react";
import { usePublicReportPageLogic } from "@/hooks/usePublicReportPageLogic";
import ToothMap from "@/components/ToothMap";

/* ─── Memoized Card ────────────────────────────────────────────────── */
const Card = memo(function Card({ content }) {
    return (
        <div className="rounded-2xl bg-[#2e2e2e] p-6 border border-[#4e4e4e]/40 shadow-lg">
            <p className="text-sm leading-relaxed text-[#c0c0c0] italic">
                "{content}"
            </p>
        </div>
    );
});

/* ─── Image Row Groups (avoid re-creating on every render) ─────────── */
const IMAGE_ROWS = [
    [
        "extraoral_frontal_rest",
        "extraoral_frontal_smile",
        "extraoral_profile",
    ],
    [
        "intraoral_right_buccal",
        "intraoral_frontal",
        "intraoral_left_buccal",
    ],
    [
        "intraoral_maxillary_occlusal",
        "intraoral_mandibular_occlusal",
    ],
];

/* ─── Staggered animation helper (CSS custom props) ─────────────── */
const staggerStyle = (i) => ({
    animationDelay: `${i * 80}ms`,
    animationFillMode: "both",
});

export default function PublicReportPage() {
    const { id, report, loading, error, cards, groupedRecommendations } =
        usePublicReportPageLogic();

    /* ─── Memoized helpers ──────────────────────────────────────────── */
    const formatDate = useCallback((d) => {
        if (!d) return "-";
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return "-";
        return dt.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }, []);

    const firstImage = useCallback((v) => {
        if (!v) return null;
        if (Array.isArray(v)) return v.length ? v[0] : null;
        return (
            v
                .toString()
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)[0] || null
        );
    }, []);

    /* ─── Derived/memoized data ─────────────────────────────────────── */
    const formattedDob = useMemo(
        () => formatDate(report?.date_of_birth),
        [formatDate, report?.date_of_birth],
    );
    const formattedScanDate = useMemo(
        () => formatDate(report?.scan_date),
        [formatDate, report?.scan_date],
    );
    const diagnosisCount = report?.diagnosis?.length || 0;

    /* ─── Loading State ─────────────────────────────────────────────── */
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#3a3a3a] relative overflow-hidden"
                 style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,145,164,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(185,185,185,0.05) 0%, transparent 60%), #3a3a3a' }}>
                <div className="flex flex-col items-center gap-5 relative z-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#ff91a4] border-t-transparent"></div>
                    <p className="font-opensans font-medium text-[#b9b9b9] animate-pulse tracking-wide">
                        Menyiapkan laporan kesehatan gigi...
                    </p>
                </div>
            </div>
        );
    }

    /* ─── Error State ───────────────────────────────────────────────── */
    if (error) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-[#3a3a3a] p-6 text-center"
                 style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,145,164,0.08) 0%, transparent 60%), #3a3a3a' }}>
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white font-montserrat">
                    Oops! Terjadi kesalahan
                </h2>
                <p className="mt-3 text-[#a0a0a0] max-w-xs">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 rounded-full bg-[#ff91a4] hover:bg-[#d67a8a] px-8 py-3 font-semibold text-white shadow-lg shadow-[#ff91a4]/20 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    /* ─── Main Report ───────────────────────────────────────────────── */
    return (
        <div className="min-h-screen bg-[#3a3a3a] text-[#b9b9b9] font-opensans selection:bg-[#ff91a4] selection:text-white relative z-0">
            {/* ── Ambient Background (radial-gradient, zero GPU cost) ── */}
            <div
                className="fixed inset-0 z-[-1] pointer-events-none"
                style={{
                    background: [
                        'radial-gradient(ellipse 600px 600px at 10% 10%, rgba(255,145,164,0.09) 0%, transparent 70%)',
                        'radial-gradient(ellipse 700px 700px at 90% 90%, rgba(185,185,185,0.06) 0%, transparent 70%)',
                        'radial-gradient(ellipse 400px 400px at 70% 45%, rgba(255,145,164,0.05) 0%, transparent 70%)',
                        'linear-gradient(135deg, #3a3a3a 0%, #3a3a3a 60%, #252525 100%)',
                    ].join(', '),
                }}
            />

            {/* ── Sticky Top Bar ────────────────────────────────────── */}
            <div className="sticky top-0 z-40 border-b border-[#4e4e4e]/40 bg-[#2a2a2a]/[0.97] px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff91a4] shadow-sm shadow-[#ff91a4]/50"></div>
                    <span className="text-sm font-bold tracking-tight text-white uppercase font-montserrat">
                        Oral Health Report
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#a0a0a0]">
                    <FileText size={12} className="text-[#ff91a4]/70" />
                    ID: #{id?.padStart(5, "0")}
                </div>
            </div>

            <main className="mx-auto max-w-4xl px-2 sm:px-6 pt-8 sm:pt-10 pb-16 relative z-10">
                {/* ── Page Header ───────────────────────────────────── */}
                <section className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#ff91a4]/10 border border-[#ff91a4]/20">
                        <Activity size={14} className="text-[#ff91a4]" />
                        <span className="text-xs font-semibold text-[#ff91a4] tracking-wide uppercase">
                            Digital Report
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-montserrat leading-tight">
                        Laporan{" "}
                        <span className="text-[#ff91a4]">Kesehatan</span> Gigi
                    </h1>
                    <p className="mt-3 text-[#a0a0a0] max-w-md mx-auto leading-relaxed">
                        Ringkasan hasil pemeriksaan medis digital untuk
                        evaluasi kesehatan gigi Anda.
                    </p>
                </section>

                {/* ── Profile Card (Glassmorphism) ──────────────────── */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#4e4e4e]/40 bg-[#2e2e2e] p-4 sm:p-6 shadow-xl shadow-black/10 animate-[fadeInUp_0.6s_ease-out_0.1s_both]" style={{ contain: 'content' }}>
                    <div className="flex items-baseline justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-[#ff91a4]" />
                            <h2 className="text-lg font-bold text-white font-montserrat">
                                Ringkasan Profil
                            </h2>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                report.status === "Completed"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            }`}
                        >
                            {report.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {[
                            {
                                icon: <User size={12} />,
                                label: "Nama Lengkap",
                                value: report.patient_name,
                            },
                            {
                                icon: <Calendar size={12} />,
                                label: "Usia / Kelamin",
                                value: `${report.age} Tahun / ${
                                    report.gender?.toLowerCase() === "male"
                                        ? "Laki-laki"
                                        : report.gender?.toLowerCase() === "female"
                                        ? "Perempuan"
                                        : report.gender || "-"
                                }`,
                            },
                            {
                                icon: <MapPin size={12} />,
                                label: "Tanggal Lahir",
                                value: formattedDob,
                            },
                            {
                                icon: <Info size={12} />,
                                label: "Tanggal Checkup",
                                value: formattedScanDate,
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="space-y-1.5 group"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#808080] flex items-center gap-1.5 group-hover:text-[#ff91a4] transition-colors">
                                    <span className="text-[#ff91a4]/60">
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </p>
                                <p className="font-bold text-white/90">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Condition Cards ───────────────────────────────── */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                    <div
                        className={`flex items-center gap-4 p-5 transition-transform hover:scale-[1.02] hover:-translate-y-0.5 ${cards.dentalCondition.cardClass}`}
                    >
                        <div className={cards.dentalCondition.iconWrapClass}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80">
                                Dental Condition
                            </p>
                            <p className="text-lg font-extrabold">
                                {cards.dentalCondition.label}
                            </p>
                            <p className="text-[10px] opacity-85 mt-0.5">
                                {cards.dentalCondition.badge}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-4 p-5 transition-transform hover:scale-[1.02] hover:-translate-y-0.5 ${cards.oralHygiene.cardClass}`}
                    >
                        <div className={cards.oralHygiene.iconWrapClass}>
                            <AlertCircle
                                size={24}
                                className="text-[#ff91a4]"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#808080]">
                                Oral Hygiene
                            </p>
                            <p className="text-lg font-extrabold text-white">
                                {cards.oralHygiene.label}
                            </p>
                            <p className="text-[10px] text-[#a0a0a0] mt-0.5">
                                {cards.oralHygiene.badge}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Tooth Map ─────────────────────────────────────── */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#4e4e4e]/40 bg-[#2e2e2e] p-3 sm:p-8 shadow-xl shadow-black/10 animate-[fadeInUp_0.6s_ease-out_0.3s_both]" style={{ contain: 'content' }}>
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Stethoscope
                                    size={16}
                                    className="text-[#ff91a4]"
                                />
                                <h3 className="text-lg font-bold text-white font-montserrat">
                                    Peta Kesehatan Gigi
                                </h3>
                            </div>
                            <p className="text-xs text-[#808080] mt-1 ml-6">
                                Status diagnosis per elemen gigi
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-[#ff91a4]/10 flex items-center justify-center">
                            <Search
                                size={16}
                                className="text-[#ff91a4]/60"
                            />
                        </div>
                    </div>

                    <div className="relative mx-auto w-full pb-10">
                        <div className="flex flex-col gap-6 w-full items-center">
                            <div className="w-full">
                                <ToothMap
                                    diagnosis={report.diagnosis || []}
                                />
                            </div>

                            {/* Total Issue Circle */}
                            <div className="mx-auto h-36 w-36 rounded-full bg-[#ff91a4]/10 flex flex-col items-center justify-center border-2 border-dashed border-[#ff91a4]/40 relative overflow-hidden" style={{ boxShadow: '0 0 30px rgba(255,145,164,0.12), inset 0 0 20px rgba(255,145,164,0.06)' }}>
                                <div className="absolute inset-3 rounded-full border border-[#ff91a4]/25 bg-[#383838] shadow-lg flex flex-col items-center justify-center text-center p-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b0b0b0]">
                                        Total Issue
                                    </p>
                                    <p className="text-3xl font-black text-[#ff91a4] drop-shadow-sm">
                                        {diagnosisCount}
                                    </p>
                                </div>
                                <div className="h-full w-full rotate-45 border-4 border-[#ff91a4]/20 rounded-full opacity-60"></div>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis List */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-[#4e4e4e]/30 pt-6">
                        {report.diagnosis?.map((d, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 rounded-xl bg-[#353535]/60 p-2.5 transition-all hover:bg-[#ff91a4]/10 hover:border-[#ff91a4]/20 border border-transparent cursor-default"
                                style={staggerStyle(i)}
                            >
                                <div
                                    className="h-2.5 w-2.5 rounded-full ring-2 ring-offset-1 ring-offset-[#353535]"
                                    style={{
                                        backgroundColor: d.color,
                                        ringColor: d.color,
                                    }}
                                ></div>
                                <span className="text-[10px] font-bold tracking-tight text-[#808080]">
                                    Gigi {d.tooth}
                                </span>
                                <span className="text-[11px] font-bold text-white/80 truncate">
                                    {d.disease}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Foto Pemeriksaan ──────────────────────────────── */}
                <div className="mb-8 rounded-2xl border border-[#4e4e4e]/40 bg-[#2e2e2e] p-4 sm:p-8 shadow-xl shadow-black/10 animate-[fadeInUp_0.6s_ease-out_0.4s_both]" style={{ contain: 'content' }}>
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Camera
                                    size={16}
                                    className="text-[#ff91a4]"
                                />
                                <h3 className="text-lg font-bold text-white font-montserrat">
                                    Foto Pemeriksaan
                                </h3>
                            </div>
                            <p className="text-xs text-[#808080] mt-1 ml-6">
                                Dokumentasi visual hasil pemindaian digital
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {IMAGE_ROWS.map((row, rowIdx) => (
                            <div
                                key={rowIdx}
                                className="flex flex-wrap justify-center gap-4 sm:gap-6"
                            >
                                {row.map((typeName) => {
                                    const imgUrl = firstImage(
                                        report.images?.[typeName] ||
                                            report[typeName] ||
                                            (typeName ===
                                            "intraoral_maxillary_occlusal"
                                                ? report.image_upper
                                                : null) ||
                                            (typeName ===
                                            "intraoral_mandibular_occlusal"
                                                ? report.image_lower
                                                : null),
                                    );

                                    return (
                                        <div
                                            key={typeName}
                                            className="w-[calc(33.333%-1rem)] min-w-[90px] group"
                                        >
                                            <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-wider text-[#808080] group-hover:text-[#ff91a4] transition-colors h-7 flex items-center justify-center leading-tight">
                                                {typeName.replace(/_/g, " ")}
                                            </p>
                                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#4e4e4e]/40 bg-[#353535]/60 shadow-sm transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-lg group-hover:shadow-[#ff91a4]/10 group-hover:border-[#ff91a4]/30">
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={typeName}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center p-2 text-center">
                                                        <span className="text-[10px] italic text-[#606060]">
                                                            N/A
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Diagnosis Detail ──────────────────────────────── */}
                <div className="mb-8 space-y-4 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-7 w-1 rounded-full bg-gradient-to-b from-[#ff91a4] to-[#ff91a4]/30"></div>
                        <h3 className="text-lg font-bold text-white font-montserrat">
                            Diagnosis Detail
                        </h3>
                    </div>

                    <Card
                        content={
                            diagnosisCount
                                ? `Ditemukan ${diagnosisCount} temuan pada pemeriksaan ini. Silakan lihat rekomendasi perawatan berdasarkan diagnosis di bawah.`
                                : "Tidak ada temuan diagnosis spesifik pada laporan ini."
                        }
                    />

                    {/* Symptoms (per disease) */}
                    {report.diagnosis?.length ? (
                        <div className="grid grid-cols-1 gap-4">
                            {groupedRecommendations.map((g, i) =>
                                g.symptoms ? (
                                    <div
                                        key={`sym-${i}`}
                                        className="rounded-2xl bg-[#2e2e2e] p-5 border border-[#4e4e4e]/40 transition-colors hover:border-[#ff91a4]/20"
                                    >
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/70 mb-2">
                                            Gejala • {g.disease}
                                        </p>
                                        <p className="text-sm leading-relaxed text-[#c0c0c0]">
                                            {g.symptoms}
                                        </p>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    ) : null}

                    {/* Recommendations */}
                    <div className="grid grid-cols-1 gap-4">
                        {report.diagnosis?.length ? (
                            groupedRecommendations.map((g, i) => (
                                <div
                                    key={`rec-${i}`}
                                    className="rounded-2xl bg-[#452e33] p-6 border border-[#ff91a4]/15 transition-colors hover:bg-[#4d323a] hover:border-[#ff91a4]/25"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/70 mb-2">
                                        Rekomendasi Gigi {g.teeth.join(", ")} •{" "}
                                        {g.disease}
                                    </p>
                                    <p className="text-sm leading-relaxed text-[#c0c0c0]">
                                        {g.treatment_recommendation ||
                                            "Belum ada rekomendasi perawatan."}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-2xl bg-[#452e33] p-6 border border-[#ff91a4]/15">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/70 mb-2">
                                    Rekomendasi Utama
                                </p>
                                <p className="text-sm leading-relaxed text-[#c0c0c0]">
                                    Belum ada rekomendasi perawatan dari data
                                    diagnosis.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Footer ────────────────────────────────────────── */}
                <div className="mt-16 pt-8 border-t border-[#4e4e4e]/30 text-center animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#808080] mb-2 underline decoration-[#ff91a4]/30 underline-offset-4 pointer-events-none">
                        Sefya Dental Studio © {new Date().getFullYear()}
                    </p>
                    <p className="text-[10px] text-[#606060] max-w-md mx-auto leading-relaxed">
                        Laporan ini dibuat secara otomatis melalui sistem
                        analisis digital. Hasil pemeriksaan ini bersifat
                        sementara dan perlu divalidasi oleh dokter gigi ahli.
                    </p>
                </div>
            </main>

            {/* ── Global Keyframe Styles ─────────────────────────────── */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
