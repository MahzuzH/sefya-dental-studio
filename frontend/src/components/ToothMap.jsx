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
    path =
      "M 7 5 C 6 5 6 7 6 9 C 6 13 9 14 9 16 L 10 21 C 10 23 14 23 14 21 L 15 16 C 15 14 18 13 18 9 C 18 7 18 5 17 5 Z";
  } else if (shape === "canine") {
    path =
      "M 12 3 C 10 5 7 6 7 9 C 7 13 9 14 9 16 L 10 21 C 10 23 14 23 14 21 L 15 16 C 15 14 18 13 18 9 C 18 6 15 5 12 3 Z";
  } else if (shape === "premolar") {
    path =
      "M 8 4 C 6 5 5 7 5 10 C 5 13 8 14 8 16 L 9 21 C 9 23 15 23 15 21 L 16 16 C 16 14 19 13 19 10 C 19 7 18 5 16 4 C 14 3 10 3 8 4 Z";
  } else if (shape === "molar") {
    path =
      "M 5 5 C 4 5 4 7 4 9 C 4 12 7 13 7 15 L 7 21 C 7 23 9 23 10 21 L 11 16 L 13 16 L 14 21 C 15 23 17 23 17 21 L 17 15 C 17 13 20 12 20 9 C 20 7 20 5 19 5 C 17 5 16 6 15 6 C 14 6 13 5 12 5 C 11 5 10 6 9 6 C 8 6 7 5 5 5 Z";
  }

  const bg = diagData?.color;
  const fillColor = bg || "#f8fafc";
  const strokeColor = bg || "#cbd5e1";

  return (
    <div
      className={`relative flex w-full aspect-[3/4] max-w-[64px] flex-col items-center justify-center transition-all group cursor-pointer hover:z-50 ${
        diagData
          ? "opacity-100 scale-105 hover:scale-[1.15] z-10"
          : "hover:scale-110 opacity-95 hover:opacity-100 z-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={`w-full h-full drop-shadow-sm group-hover:drop-shadow-md transition-all ${
          isUpper ? "rotate-180" : ""
        }`}
        style={{
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: diagData ? 0 : 1.5,
        }}
      >
        <path d={path} />
      </svg>

      {/* Tooth Number Badge */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none p-1 ${
          isUpper ? "items-end pb-1 sm:pb-1.5" : "items-start pt-1 sm:pt-1.5"
        }`}
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: "clamp(8px, 2vw, 10px)",
            color: diagData ? "#fff" : "#475569",
            textShadow: diagData
              ? "0px 1px 2px rgba(0,0,0,0.5)"
              : "0px 1px 3px rgba(255,255,255,1), 0px 0px 2px rgba(255,255,255,0.9)",
          }}
        >
          {number}
        </span>
      </div>

      {diagData && (
        <span
          className={`absolute ${
            isUpper ? "top-[-3px]" : "bottom-[-3px]"
          } block h-[3px] w-[14px] rounded-full bg-slate-400/30 blur-[0.5px]`}
        />
      )}

      <div
        className={`absolute left-1/2 -translate-x-1/2 ${
          isUpper ? "bottom-full mb-1.5" : "top-full mt-1.5"
        } z-[100] pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col items-center w-max`}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-slate-200 rotate-45 ${
            isUpper
              ? "bottom-[-4px] border-b border-r"
              : "top-[-4px] border-t border-l"
          }`}
        />

        <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg shadow-lg py-1.5 px-2.5 relative z-10 max-w-[200px]">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-900">Gigi {number}</span>
            {diagData ? (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 truncate">{diagData.disease}</span>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: bg }}
                />
              </>
            ) : (
              <span className="text-slate-400 italic">Normal</span>
            )}
          </div>
          {diagData?.tooth_surface && (
            <div className="text-[10px] text-slate-400 mt-0.5">
              Permukaan: {diagData.tooth_surface}
            </div>
          )}
          {diagData?.notes && (
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">
              {diagData.notes}
            </div>
          )}
        </div>
      </div>
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
      {/* Upper Jaw Label */}
      <div className="flex items-center justify-center w-full mb-5 opacity-90 select-none">
        <div className="h-px bg-gradient-to-r from-transparent to-[#4e4e4e]/50 flex-1 max-w-[80px] mr-4" />
        <span className="text-xs font-bold text-[#808080] tracking-[0.2em] uppercase">
          Rahang Atas
        </span>
        <div className="h-px bg-gradient-to-l from-transparent to-[#4e4e4e]/50 flex-1 max-w-[80px] ml-4" />
      </div>

      {/* Upper Teeth Row */}
      <div className="flex items-center justify-center w-full gap-[2px] sm:gap-1.5 md:gap-2 relative">
        {upper.map((t) => (
          <div
            key={t}
            className="flex-1 max-w-[64px] min-w-[14px] sm:min-w-[20px]"
          >
            <Tooth number={t} diagData={diagMap[t]} />
          </div>
        ))}
      </div>

      {/* Occlusal Line */}
      <div className="flex items-center justify-center my-7 px-2 sm:px-4 group select-none">
        <div className="flex-1 border-t border-dashed border-[#4e4e4e]/40 transition-colors duration-500 group-hover:border-[#ff91a4]/30" />
        <div className="px-5 mx-4 bg-[#ff91a4]/5 text-[#ff91a4] border border-[#ff91a4]/20 shadow-[0_0_10px_rgba(255,145,164,0.05)] rounded-full text-[10px] sm:text-xs font-bold py-1 tracking-[0.15em] whitespace-nowrap transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,145,164,0.15)] group-hover:bg-[#ff91a4]/10">
          GARIS OKLUSAL
        </div>
        <div className="flex-1 border-t border-dashed border-[#4e4e4e]/40 transition-colors duration-500 group-hover:border-[#ff91a4]/30" />
      </div>

      {/* Lower Teeth Row */}
      <div className="flex items-center justify-center w-full gap-[2px] sm:gap-1.5 md:gap-2 mb-5 relative">
        {lower.map((t) => (
          <div
            key={t}
            className="flex-1 max-w-[64px] min-w-[14px] sm:min-w-[20px]"
          >
            <Tooth number={t} diagData={diagMap[t]} />
          </div>
        ))}
      </div>

      {/* Lower Jaw Label */}
      <div className="flex items-center justify-center w-full mt-2 opacity-90 select-none">
        <div className="h-px bg-gradient-to-r from-transparent to-[#4e4e4e]/50 flex-1 max-w-[80px] mr-4" />
        <span className="text-xs font-bold text-[#808080] tracking-[0.2em] uppercase">
          Rahang Bawah
        </span>
        <div className="h-px bg-gradient-to-l from-transparent to-[#4e4e4e]/50 flex-1 max-w-[80px] ml-4" />
      </div>
    </div>
  );
});
