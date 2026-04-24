import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const HIGH_SEVERITY_KEYWORDS = [
    "karies",
    "sisa akar",
    "impaksi",
    "supernumerary",
    "gigi hilang",
];

const MEDIUM_SEVERITY_KEYWORDS = [
    "karang gigi",
    "maloklusi",
    "restorasi indirect",
    "restorasi gigi",
];

function getSeverityFromDiagnosisItem(item) {
    const disease = String(item?.disease || "").toLowerCase();

    if (HIGH_SEVERITY_KEYWORDS.some((k) => disease.includes(k))) return "high";
    if (MEDIUM_SEVERITY_KEYWORDS.some((k) => disease.includes(k)))
        return "medium";
    return "low";
}

function getConditionCards(diagnosis = []) {
    if (!diagnosis.length) {
        return {
            dentalCondition: {
                label: "Sehat",
                badge: "Sangat Baik",
                cardClass:
                    "rounded-2xl bg-emerald-600/90 text-white shadow-xl shadow-emerald-900/30 border border-emerald-500/40",
                iconWrapClass:
                    "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm",
            },
            oralHygiene: {
                label: "Bagus",
                badge: "Terjaga",
                cardClass:
                    "rounded-2xl bg-[#2e2e2e]/70 backdrop-blur-md text-white border border-[#4e4e4e]/40 shadow-lg shadow-black/10",
                iconWrapClass:
                    "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#353535] shadow-sm",
            },
        };
    }

    const severities = diagnosis.map(getSeverityFromDiagnosisItem);
    const hasHigh = severities.includes("high");
    const hasMedium = severities.includes("medium");

    let dentalCondition;
    let oralHygiene;

    if (hasHigh) {
        dentalCondition = {
            label: "Perlu Perawatan",
            badge: "Prioritas Tinggi",
            cardClass:
                "rounded-2xl bg-rose-600/90 text-white shadow-xl shadow-rose-900/30 border border-rose-500/40",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm",
        };
        oralHygiene = {
            label: "Kurang",
            badge: "Perlu Ditingkatkan",
            cardClass:
                "rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-lg shadow-black/10",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 shadow-sm",
        };
    } else if (hasMedium) {
        dentalCondition = {
            label: "Cukup",
            badge: "Perlu Perhatian",
            cardClass:
                "rounded-2xl bg-[#ff91a4]/90 text-white shadow-xl shadow-[#ff91a4]/20 border border-[#ff91a4]/40",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm",
        };
        oralHygiene = {
            label: "Cukup",
            badge: "Kontrol Rutin",
            cardClass:
                "rounded-2xl bg-[#2e2e2e]/70 backdrop-blur-md text-white border border-[#4e4e4e]/40 shadow-lg shadow-black/10",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#353535] shadow-sm",
        };
    } else {
        dentalCondition = {
            label: "Baik",
            badge: "Stabil",
            cardClass:
                "rounded-2xl bg-emerald-600/90 text-white shadow-xl shadow-emerald-900/30 border border-emerald-500/40",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm",
        };
        oralHygiene = {
            label: "Bagus",
            badge: "Terjaga",
            cardClass:
                "rounded-2xl bg-[#2e2e2e]/70 backdrop-blur-md text-white border border-[#4e4e4e]/40 shadow-lg shadow-black/10",
            iconWrapClass:
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#353535] shadow-sm",
        };
    }

    return { dentalCondition, oralHygiene };
}

export function usePublicReportPageLogic() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/report/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Report not found");
                return res.json();
            })
            .then((data) => {
                setReport(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const cards = useMemo(
        () => getConditionCards(report?.diagnosis || []),
        [report?.diagnosis],
    );

    const groupedRecommendations = useMemo(() => {
        const diag = report?.diagnosis || [];
        const map = {};
        diag.forEach((d) => {
            const key = String(d?.disease || "").trim();
            if (!key) return;
            if (!map[key]) {
                map[key] = {
                    disease: key,
                    color: d.color || "#000",
                    treatment_recommendation:
                        d.treatment_recommendation ||
                        d.treatmentRecommendation ||
                        "",
                    teeth: [],
                    symptoms: d.symptoms || "",
                };
            }
            if (d.tooth != null) map[key].teeth.push(d.tooth);
        });

        return Object.values(map).map((g) => ({
            ...g,
            teeth: Array.from(new Set(g.teeth)).sort((a, b) => a - b),
        }));
    }, [report?.diagnosis]);

    return {
        id,
        report,
        loading,
        error,
        cards,
        groupedRecommendations,
    };
}
