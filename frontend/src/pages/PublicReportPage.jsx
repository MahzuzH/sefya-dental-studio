import { Helmet } from "react-helmet-async";
import { useCallback, useMemo, memo } from "react";
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
        <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
            <p className="text-sm leading-relaxed text-[#64748b] italic">
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
            <>
            <Helmet>
                <title>Memuat Laporan... | Sefya Dental Studio Subang</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="flex h-screen items-center justify-center bg-white relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#ff91a4]/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[#f472b6]/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col items-center gap-5 relative z-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#ff91a4] border-t-transparent"></div>
                    <p className="font-poppins font-medium text-[#64748b] animate-pulse tracking-wide">
                        Menyiapkan laporan kesehatan gigi...
                    </p>
                </div>
            </div>
            </>
        );
    }

    /* ─── Error State ────────────────────────────────────────────────── */
    if (error) {
        return (
            <>
            <Helmet>
                <title>Laporan Tidak Ditemukan | Sefya Dental Studio Subang</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="flex h-screen flex-col items-center justify-center bg-white p-6 text-center relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#ff91a4]/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-[#0f172a] font-montserrat">
                    Oops! Terjadi kesalahan
                </h2>
                <p className="mt-3 text-[#64748b] max-w-xs">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 rounded-full bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200"
                >
                    Coba Lagi
                </button>
            </div>
            </>
        );
    }

    /* ─── Main Report ───────────────────────────────────────────────── */
    const reportTitle = report?.patient_name
        ? `Laporan Kesehatan Gigi - ${report.patient_name} | Sefya Dental Studio Subang`
        : "Laporan Kesehatan Gigi | Sefya Dental Studio Subang";
    const reportDesc = report?.patient_name
        ? `Laporan hasil pemeriksaan gigi ${report.patient_name} di Sefya Dental Studio Subang. ${report.diagnosis?.length || 0} temuan diagnosis tercatat.`
        : "Laporan hasil pemeriksaan gigi digital dari Sefya Dental Studio, klinik dokter gigi terpercaya di Subang.";

    const reportSchema = report?.patient_name ? {
        "@context": "https://schema.org",
        "@type": "MedicalReport",
        name: `Laporan Kesehatan Gigi - ${report.patient_name}`,
        datePublished: report.scan_date || new Date().toISOString().split("T")[0],
        about: {
            "@type": "Patient",
            name: report.patient_name,
        },
        author: {
            "@type": "Dentist",
            name: "Sefya Dental Studio",
            url: "https://sefyadentalstudio.web.id",
        },
    } : null;

    return (
        <>
        <Helmet>
            <title>{reportTitle}</title>
            <meta name="description" content={reportDesc} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={`https://sefyadentalstudio.web.id/report/${id}`} />
            <meta property="og:title" content={reportTitle} />
            <meta property="og:description" content={reportDesc} />
            <meta property="og:url" content={`https://sefyadentalstudio.web.id/report/${id}`} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="https://sefyadentalstudio.web.id/og-image.svg" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={reportTitle} />
            <meta name="twitter:description" content={reportDesc} />
            {report?.patient_name && reportSchema && (
                <script type="application/ld+json">{JSON.stringify(reportSchema)}</script>
            )}
        </Helmet>
        <div className="min-h-screen bg-white text-[#64748b] font-poppins selection:bg-[#ff91a4]/20 selection:text-[#be185d] relative z-0">
            {/* ── Ambient Background ─────────────────────────────────── */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#ff91a4]/8 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#f472b6]/8 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f1f5f9] rounded-full blur-[100px]"></div>
            </div>

            {/* ── Sticky Top Bar ────────────────────────────────────── */}
            <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff91a4] shadow-sm shadow-[#ff91a4]/50"></div>
                    <span className="text-sm font-bold tracking-tight text-[#0f172a] uppercase font-montserrat">
                        Oral Health Report
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748b]">
                    <FileText size={12} className="text-[#ff91a4]/70" />
                    ID: #{id?.padStart(5, "0")}
                </div>
            </div>

            <main className="mx-auto max-w-4xl px-2 sm:px-6 pt-8 sm:pt-10 pb-16 relative z-10">
                {/* ── Page Header ───────────────────────────────────── */}
                <section className="mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#ff91a4]"></span>
                        <span className="text-xs font-semibold tracking-widest text-[#0f172a] uppercase">
                            Digital Report
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] font-montserrat leading-tight">
                        Laporan{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fb7185] via-[#ff91a4] to-[#f472b6]">
                            Kesehatan
                        </span>{" "}Gigi
                    </h1>
                    <p className="mt-3 text-[#64748b] max-w-md mx-auto leading-relaxed">
                        Ringkasan hasil pemeriksaan medis digital untuk
                        evaluasi kesehatan gigi Anda.
                    </p>
                </section>

                {/* ── Profile Card ──────────────────────────────────── */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-lg animate-[fadeInUp_0.6s_ease-out_0.1s_both] relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff91a4]/5 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="flex items-baseline justify-between mb-6 relative">
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-[#ff91a4]" />
                            <h2 className="text-lg font-bold text-[#0f172a] font-montserrat">
                                Ringkasan Profil
                            </h2>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                report.status === "Completed"
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                    : "bg-amber-50 text-amber-600 border border-amber-200"
                            }`}
                        >
                            {report.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 relative">
                        {[
                            {
                                icon: <User size={16} className="text-[#ff91a4]" />,
                                label: "Nama Lengkap",
                                value: report.patient_name,
                            },
                            {
                                icon: <Calendar size={16} className="text-[#ff91a4]" />,
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
                                icon: <MapPin size={16} className="text-[#ff91a4]" />,
                                label: "Tanggal Lahir",
                                value: formattedDob,
                            },
                            {
                                icon: <Info size={16} className="text-[#ff91a4]" />,
                                label: "Tanggal Checkup",
                                value: formattedScanDate,
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#ff91a4]/10 group-hover:border-[#ff91a4]/20">
                                    {item.icon}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                                        {item.label}
                                    </p>
                                    <p className="font-semibold text-[#0f172a]">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Condition Cards ───────────────────────────────── */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                    <div
                        className={`flex items-center gap-4 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 ${cards.dentalCondition.cardClass}`}
                    >
                        <div className={cards.dentalCondition.iconWrapClass}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">
                                Dental Condition
                            </p>
                            <p className="text-lg font-extrabold text-[#0f172a]">
                                {cards.dentalCondition.label}
                            </p>
                            <p className="text-[10px] mt-0.5 opacity-85">
                                {cards.dentalCondition.badge}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-4 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 ${cards.oralHygiene.cardClass}`}
                    >
                        <div className={cards.oralHygiene.iconWrapClass}>
                            <AlertCircle
                                size={24}
                                className="text-[#ff91a4]"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">
                                Oral Hygiene
                            </p>
                            <p className="text-lg font-extrabold text-[#0f172a]">
                                {cards.oralHygiene.label}
                            </p>
                            <p className="text-[10px] text-[#64748b] mt-0.5">
                                {cards.oralHygiene.badge}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Tooth Map ─────────────────────────────────────── */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-3 sm:p-8 shadow-lg animate-[fadeInUp_0.6s_ease-out_0.3s_both] relative">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff91a4]/5 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="mb-8 flex items-center justify-between relative">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Stethoscope
                                    size={16}
                                    className="text-[#ff91a4]"
                                />
                                <h3 className="text-lg font-bold text-[#0f172a] font-montserrat">
                                    Peta Kesehatan Gigi
                                </h3>
                            </div>
                            <p className="text-xs text-[#94a3b8] mt-1 ml-6">
                                Status diagnosis per elemen gigi
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-[#ff91a4]/10 border border-[#ff91a4]/20 flex items-center justify-center">
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
                            <div className="mx-auto h-36 w-36 rounded-full bg-[#ff91a4]/10 flex flex-col items-center justify-center border-2 border-dashed border-[#ff91a4]/30 relative overflow-hidden" style={{ boxShadow: '0 0 30px rgba(255,145,164,0.12), inset 0 0 20px rgba(255,145,164,0.06)' }}>
                                <div className="absolute inset-3 rounded-full border border-[#ff91a4]/20 bg-white shadow-lg flex flex-col items-center justify-center text-center p-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
                                        Total Issue
                                    </p>
                                    <p className="text-3xl font-black text-[#ff91a4] drop-shadow-sm">
                                        {diagnosisCount}
                                    </p>
                                </div>
                                <div className="h-full w-full rotate-45 border-4 border-[#ff91a4]/15 rounded-full opacity-60"></div>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis List */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-200 pt-6">
                        {report.diagnosis?.map((d, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5 transition-all hover:bg-[#ff91a4]/10 hover:border-[#ff91a4]/20 border border-transparent cursor-default"
                                style={staggerStyle(i)}
                            >
                                <div
                                    className="h-2.5 w-2.5 rounded-full ring-2 ring-offset-1 ring-offset-white"
                                    style={{
                                        backgroundColor: d.color,
                                        ringColor: d.color,
                                    }}
                                ></div>
                                <span className="text-[10px] font-bold tracking-tight text-[#94a3b8]">
                                    Gigi {d.tooth}
                                </span>
                                <span className="text-[11px] font-semibold text-[#0f172a] truncate">
                                    {d.disease}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Foto Pemeriksaan ──────────────────────────────── */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-lg animate-[fadeInUp_0.6s_ease-out_0.4s_both] relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f472b6]/5 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="mb-8 flex items-center justify-between relative">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Camera
                                    size={16}
                                    className="text-[#ff91a4]"
                                />
                                <h3 className="text-lg font-bold text-[#0f172a] font-montserrat">
                                    Foto Pemeriksaan
                                </h3>
                            </div>
                            <p className="text-xs text-[#94a3b8] mt-1 ml-6">
                                Dokumentasi visual hasil pemindaian digital
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 relative">
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
                                            <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-wider text-[#94a3b8] group-hover:text-[#ff91a4] transition-colors h-7 flex items-center justify-center leading-tight">
                                                {typeName.replace(/_/g, " ")}
                                            </p>
                                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-lg group-hover:shadow-[#ff91a4]/10 group-hover:border-[#ff91a4]/30">
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={typeName}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center p-2 text-center">
                                                        <span className="text-[10px] italic text-[#94a3b8]">
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
                        <h3 className="text-lg font-bold text-[#0f172a] font-montserrat">
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
                                        className="rounded-2xl bg-white p-5 border border-slate-200 transition-all hover:shadow-md hover:border-[#ff91a4]/30"
                                    >
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/70 mb-2">
                                            Gejala • {g.disease}
                                        </p>
                                        <p className="text-sm leading-relaxed text-[#64748b]">
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
                                    className="rounded-2xl bg-gradient-to-br from-[#fef2f4] to-[#fff5f7] p-6 border border-[#ff91a4]/20 transition-all hover:shadow-md hover:border-[#ff91a4]/40"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/80 mb-2">
                                        Rekomendasi Gigi {g.teeth.join(", ")} •{" "}
                                        {g.disease}
                                    </p>
                                    <p className="text-sm leading-relaxed text-[#64748b]">
                                        {g.treatment_recommendation ||
                                            "Belum ada rekomendasi perawatan."}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-2xl bg-gradient-to-br from-[#fef2f4] to-[#fff5f7] p-6 border border-[#ff91a4]/20">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff91a4]/80 mb-2">
                                    Rekomendasi Utama
                                </p>
                                <p className="text-sm leading-relaxed text-[#64748b]">
                                    Belum ada rekomendasi perawatan dari data
                                    diagnosis.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Footer ────────────────────────────────────────── */}
                <div className="mt-16 pt-8 border-t border-slate-200 text-center animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            className="w-6 h-6 rounded-md object-cover"
                        />
                        <p className="text-sm font-bold text-[#0f172a] font-montserrat tracking-tight">
                            Sefya Dental Studio © {new Date().getFullYear()}
                        </p>
                    </div>
                    <p className="text-xs text-[#94a3b8] max-w-md mx-auto leading-relaxed">
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
        </>
    );
}
