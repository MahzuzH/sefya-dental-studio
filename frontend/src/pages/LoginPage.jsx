import loginImg from "../assets/login.png";
import { useState, useEffect } from "react";
import { preload } from "react-dom";
import { useLoginPageLogic } from "../hooks/useLoginPageLogic";
import { useNavigate } from "react-router-dom";

// Hoist static JSX to avoid re-creation on every render
const ShowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.768-6.818M6.18 6.18A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10 0 1.06-.163 2.084-.468 3.04M3 3l18 18"
    />
  </svg>
);

const HideIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginPageLogic(() => navigate("/dashboard", { replace: true }));
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Preload heavy background image for LCP optimization
  useEffect(() => {
    preload(loginImg, { as: "image" });
  }, []);

  return (
    <div className="h-screen w-screen flex font-opensans bg-black text-[#ededed] overflow-hidden relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff91a4]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* LEFT SIDE */}
      <div
        className={`w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10 transition-all duration-1000 transform ${
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden border border-white/10">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#ededed]">
            Sefya Dental Studio
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-white leading-tight">
          Selamat Datang <br /> Kembali
        </h1>
        <p className="text-[#888] text-base mb-10">
          Masuk ke akun Anda untuk melanjutkan.
        </p>

        {/* 🔥 FORM START */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className={`space-y-5 transition-all duration-1000 delay-300 transform w-full max-w-md ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* EMAIL */}
          <div className="relative">
            <input
              autoFocus
              type="email"
              placeholder="Email"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 placeholder-[#888] text-[#ededed] focus:outline-none focus:ring-1 focus:ring-[#ff91a4] focus:border-[#ff91a4] transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 pr-12 placeholder-[#888] text-[#ededed] focus:outline-none focus:ring-1 focus:ring-[#ff91a4] focus:border-[#ff91a4] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#888] hover:text-[#ededed] hover:bg-white/5 rounded-full transition-colors focus:outline-none"
              aria-label={
                showPassword ? "Sembunyikan password" : "Lihat password"
              }
            >
              {showPassword ? ShowIcon : HideIcon}
            </button>
          </div>

          <div className="pt-4">
            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#ededed] text-black py-3.5 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-[#ededed] focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed font-semibold tracking-wide"
            >
              {loading ? "Memproses..." : "Masuk Akun"}
            </button>
          </div>
        </form>
        {/* 🔥 FORM END */}
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div
        className={`hidden lg:flex w-1/2 h-full items-center justify-center p-6 transition-all duration-1000 delay-500 transform ${
          isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* WRAPPER */}
        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/10 group bg-[#050505]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-105 opacity-80"
            style={{
              backgroundImage: `url(${loginImg})`,
              backgroundPosition: "35% center",
            }}
          ></div>
          {/* Darker Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

          {/* Abstract design elements */}
          <div className="absolute bottom-12 left-12 text-[#ededed] max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff91a4] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Pelayanan Premium
              </span>
            </div>
            <p className="text-2xl font-semibold leading-relaxed tracking-tight text-white">
              "Senyum yang sehat berawal dari perawatan yang tepat dan penuh
              dedikasi."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
