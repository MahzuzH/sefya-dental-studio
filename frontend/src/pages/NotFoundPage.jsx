import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>Halaman Tidak Ditemukan (404) | Sefya Dental Studio Subang</title>
                <meta name="description" content="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Sefya Dental Studio, klinik dokter gigi terpercaya di Subang." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 text-center">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#ff91a4]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#f472b6]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-md">
                    <h1 className="text-8xl font-black text-[#ff91a4] mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-[#64748b] mb-8 leading-relaxed">
                        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
                        Silakan kembali ke beranda untuk informasi layanan gigi terbaik di Subang.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#ff91a4] hover:bg-[#fb7185] active:scale-95 text-black px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-rose-500/25"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </>
    );
}
