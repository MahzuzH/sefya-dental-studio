import React, { memo, useMemo } from "react";

const getToothShape = (tooth) => {
    const t = Number(tooth);
    const d = t % 10;
    if (d === 1 || d === 2) return "incisor";
    if (d === 3) return "canine";
    if (d === 4 || d === 5) return "premolar";
    return "molar";
};

const Tooth = memo(function Tooth({ number, diagData }) {
    const shape = getToothShape(number);
    const isUpper = [
        18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
    ].includes(number);

    let path = "";
    if (shape === "incisor") {
        path = "M 7 5 C 6 5 6 7 6 9 C 6 13 9 14 9 16 L 10 21 C 10 23 14 23 14 21 L 15 16 C 15 14 18 13 18 9 C 18 7 18 5 17 5 Z";
    } else if (shape === "canine") {
        path = "M 12 3 C 10 5 7 6 7 9 C 7 13 9 14 9 16 L 10 21 C 10 23 14 23 14 21 L 15 16 C 15 14 18 13 18 9 C 18 6 15 5 12 3 Z";
    } else if (shape === "premolar") {
        path = "M 8 4 C 6 5 5 7 5 10 C 5 13 8 14 8 16 L 9 21 C 9 23 15 23 15 21 L 16 16 C 16 14 19 13 19 10 C 19 7 18 5 16 4 C 14 3 10 3 8 4 Z";
    } else if (shape === "molar") {
        path = "M 5 5 C 4 5 4 7 4 9 C 4 12 7 13 7 15 L 7 21 C 7 23 9 23 10 21 L 11 16 L 13 16 L 14 21 C 15 23 17 23 17 21 L 17 15 C 17 13 20 12 20 9 C 20 7 20 5 19 5 C 17 5 16 6 15 6 C 14 6 13 5 12 5 C 11 5 10 6 9 6 C 8 6 7 5 5 5 Z";
    }

    const bg = diagData?.color;
    const fillColor = bg || "#353535";
    const strokeColor = bg || "#4e4e4e";

    return (
        <div
            title={
                diagData
                    ? `${diagData.disease} • ${diagData.treatment_recommendation || ""}`
                    : `Gigi ${number}`
            }
            className={`relative flex w-full aspect-[3/4] max-w-[64px] flex-col items-center justify-center transition-all duration-200 group cursor-default ${
                diagData
                    ? "shadow-md hover:scale-110"
                    : "hover:scale-105 opacity-90 hover:opacity-100"
            }`}
        >
            <svg
                viewBox="0 0 24 24"
                strokeLinejoin="round" 
                strokeLinecap="round"
                className={`w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all ${isUpper ? "rotate-180" : ""}`}
                style={{ fill: fillColor, stroke: strokeColor, strokeWidth: diagData ? 0 : 1.5 }}
            >
                <path d={path} />
            </svg>
            <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none p-1 ${
                    isUpper ? "items-end pb-1 sm:pb-1.5" : "items-start pt-1 sm:pt-1.5"
                }`}
            >
                <span
                    className="font-black leading-none"
                    style={{
                        fontSize: "clamp(8px, 1.8vw, 10px)",
                        color: diagData ? "#fff" : "#a0a0a0",
                        textShadow: diagData ? "0px 1px 2px rgba(0,0,0,0.5)" : "none",
                    }}
                >
                    {number}
                </span>
            </div>
            {diagData && (
                <span
                    className={`absolute ${
                        isUpper ? "top-[-3px]" : "bottom-[-3px]"
                    } block h-[3px] w-[14px] rounded-full bg-white/20 blur-[0.5px]`}
                />
            )}
        </div>
    );
});

export default memo(function ToothMap({ diagnosis = [] }) {
    const upper = [
        18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
    ];
    const lower = [
        48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
    ];

    const diagMap = useMemo(() => {
        const map = {};
        (diagnosis || []).forEach((d) => {
            if (d && d.tooth != null) map[d.tooth] = d;
        });
        return map;
    }, [diagnosis]);

    return (
        <div className="w-full max-w-full">
            <div className="text-center text-xs font-semibold text-[#808080] tracking-wider mb-4">
                RAHANG ATAS
            </div>

            <div className="flex items-center justify-center w-full gap-[2px] sm:gap-1.5 md:gap-2">
                {upper.map((t) => (
                    <div key={t} className="flex-1 max-w-[64px] min-w-[14px] sm:min-w-[20px]">
                        <Tooth number={t} diagData={diagMap[t]} />
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center my-6 px-2 sm:px-4">
                <div className="flex-1 border-t border-dashed border-[#4e4e4e]/60" />
                <div className="px-4 mx-4 bg-[#ff91a4]/10 text-[#ff91a4] border border-[#ff91a4]/20 rounded-full text-[10px] sm:text-xs font-medium py-0.5 whitespace-nowrap">
                    GARIS OKLUSAL
                </div>
                <div className="flex-1 border-t border-dashed border-[#4e4e4e]/60" />
            </div>

            <div className="flex items-center justify-center w-full gap-[2px] sm:gap-1.5 md:gap-2 mb-4">
                {lower.map((t) => (
                    <div key={t} className="flex-1 max-w-[64px] min-w-[14px] sm:min-w-[20px]">
                        <Tooth number={t} diagData={diagMap[t]} />
                    </div>
                ))}
            </div>

            <div className="text-center text-xs font-semibold text-[#808080] tracking-wider">
                RAHANG BAWAH
            </div>
        </div>
    );
});
