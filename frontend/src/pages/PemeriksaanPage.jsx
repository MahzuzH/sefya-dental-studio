import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/Sidebar";
import { usePemeriksaanPageLogic } from "@/hooks/usePemeriksaanPageLogic";
import {
    Search,
    Plus,
    QrCode,
    Download,
    Filter,
    MoreHorizontal,
    Pencil,
    Eye,
} from "lucide-react";
import { useEffect, Suspense, lazy } from "react";
const QRCodeDisplay = lazy(() => import("@/components/QRCodeDisplay"));
import Pagination from "@/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function PemeriksaanPage() {
    const {
        navigate,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        allExams,
        page,
        setPage,
        limit,
        setLimit,
        total,
        formatDate,
        selectedExam,
        isQRModalOpen,
        setIsQRModalOpen,
        handleViewReport,
        handleEdit,
        handleOpenQR,
        qrUrl,
    } = usePemeriksaanPageLogic();

    const totalPages =
        total && limit ? Math.max(1, Math.ceil(total / limit)) : 1;
    const progressPercent =
        totalPages > 0 ? Math.round((page / totalPages) * 100) : 0;

    return (
            <>
            <Helmet>
              <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#fff5f7] via-white to-rose-50 text-slate-900 font-poppins">
            <Sidebar active="pemeriksaan" />

            <div className="h-full lg:pl-64">
                <main className="h-full overflow-hidden p-3 sm:p-4 space-y-4 flex flex-col">
                    {/* Header */}
                    <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rose-100 bg-white px-4 py-3 shadow-sm shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Data Pemeriksaan
                            </h2>
                            <p className="text-sm text-slate-600">
                                Kelola dan lihat semua riwayat pemeriksaan pasien.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                className="gap-2 bg-[#e86177] text-white hover:bg-[#d44d63]"
                                onClick={() => navigate("/pemeriksaan/baru")}
                            >
                                <Plus size={16} /> Pemeriksaan Baru
                            </Button>
                        </div>
                    </header>

                    {/* Error */}
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shrink-0">
                            {error}
                        </div>
                    )}

                    {/* Table Card */}
                    <Card className="border-rose-100 bg-white shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                        <CardContent className="p-0 flex flex-col h-full">
                            {/* Toolbar */}
                            <div className="p-4 border-b border-rose-50 flex flex-wrap items-center justify-between gap-4 shrink-0">
                                <div className="flex items-center gap-2.5 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 w-full md:w-96">
                                    <Search
                                        size={16}
                                        className="text-slate-500 shrink-0"
                                    />
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari pasien, instansi, atau status..."
                                        className="h-auto border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                    >
                                        <Filter size={14} /> Filter
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                    >
                                        <Download size={14} /> Export
                                    </Button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <th className="px-4 py-3 sticky top-0 bg-slate-50/80 z-10 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                                                Nama Pasien
                                            </th>
                                            <th className="px-4 py-3 sticky top-0 bg-slate-50/80 z-10 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                                                Instansi
                                            </th>
                                            <th className="px-4 py-3 sticky top-0 bg-slate-50/80 z-10 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                                                Tanggal
                                            </th>
                                            <th className="px-4 py-3 sticky top-0 bg-slate-50/80 z-10 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-center sticky top-0 bg-slate-50/80 z-10 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {loading ? (
                                            Array.from({ length: 8 }).map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td className="px-4 py-3"><Skeleton className="h-4 w-36" /></td>
                                                    <td className="px-4 py-3"><Skeleton className="h-4 w-28" /></td>
                                                    <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                                                    <td className="px-4 py-3"><Skeleton className="h-6 w-20 rounded-full" /></td>
                                                    <td className="px-4 py-3"><Skeleton className="h-8 w-32 mx-auto" /></td>
                                                </tr>
                                            ))
                                        ) : allExams.length > 0 ? (
                                                allExams.map((exam) => (
                                                    <tr
                                                        key={exam.id}
                                                        className="hover:bg-rose-50/40 transition-colors"
                                                    >
                                                        <td className="px-4 py-3 font-medium text-slate-900">
                                                            {exam.patientName}
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-700">
                                                            {exam.institution}
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-700">
                                                            {formatDate(
                                                                exam.scanDate,
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                    exam.status ===
                                                                    "Completed"
                                                                        ? "bg-emerald-100 text-emerald-700"
                                                                        : "bg-amber-100 text-amber-700"
                                                                }`}
                                                            >
                                                                {exam.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-1">
                                                                {/* View Report */}
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="h-8 gap-1 px-3"
                                                                    title="Lihat laporan"
                                                                    onClick={() =>
                                                                        handleViewReport(
                                                                            exam.token ||
                                                                                exam.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye
                                                                        size={13}
                                                                    />
                                                                    <span className="hidden sm:inline">
                                                                        View
                                                                    </span>
                                                                </Button>

                                                                {/* Edit */}
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0 text-brand hover:text-[#fb7185] hover:bg-rose-50"
                                                                    title="Edit pemeriksaan"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            exam.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil
                                                                        size={14}
                                                                    />
                                                                </Button>

                                                                {/* QR Code */}
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                                                                    title="QR Code"
                                                                    onClick={() =>
                                                                        handleOpenQR(
                                                                            exam,
                                                                        )
                                                                    }
                                                                >
                                                                    <QrCode
                                                                        size={14}
                                                                    />
                                                                </Button>

                                                                {/* More */}
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0 text-slate-300 hover:text-slate-500"
                                                                    title="Lainnya"
                                                                >
                                                                    <MoreHorizontal
                                                                        size={14}
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="py-14 text-center text-slate-400 italic"
                                                    >
                                                        Tidak ada data pemeriksaan
                                                        ditemukan.
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
                                <span></span>
                                <div className="flex gap-1 items-center">
                                    <Pagination
                                        page={page}
                                        totalPages={totalPages}
                                        onPageChange={setPage}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* QR Modal */}
            <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>QR Code Pemeriksaan</DialogTitle>
                        <DialogDescription>
                            Scan QR ini untuk melihat laporan kesehatan gigi
                            pasien.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center gap-6 py-4">
                        <div className="rounded-2xl border-4 border-rose-100 bg-white p-4 shadow-xl shadow-brand/20">
                            {qrUrl && (
                                <Suspense fallback={<div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-50"><span className="text-slate-400 text-xs">Memuat QR...</span></div>}>
                                    <QRCodeDisplay url={qrUrl} />
                                </Suspense>
                            )}
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-900">
                                {selectedExam?.patientName}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {selectedExam?.institution}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 font-mono">
                                ID: {selectedExam?.id?.slice(0, 8)}...
                            </p>
                        </div>

                        <div className="flex w-full gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsQRModalOpen(false)}
                            >
                                Tutup
                            </Button>
                            <Button
                                className="flex-1 gap-2 bg-[#e86177] text-white hover:bg-[#d44d63]"
                                onClick={() => {
                                    const canvas =
                                        document.querySelector("canvas");
                                    if (!canvas) return;
                                    const url = canvas.toDataURL("image/png");
                                    const link = document.createElement("a");
                                    link.download = `QR-${selectedExam?.patientName}.png`;
                                    link.href = url;
                                    link.click();
                                }}
                            >
                                <Download size={16} /> Download QR
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
        </>
    );
}
