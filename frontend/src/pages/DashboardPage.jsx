import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardPageLogic } from "@/hooks/useDashboardPageLogic";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Bell,
    User,
    Plus,
    QrCode,
    LayoutDashboard,
    FileText,
    ClipboardList,
    Download,
    LogOut,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { useState, Suspense, lazy } from "react";
const QRCodeDisplay = lazy(() => import("@/components/QRCodeDisplay"));
const DashboardCharts = lazy(() => import("@/components/DashboardCharts"));
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Sidebar } from "@/components/Sidebar";


export default function DashboardPage() {
    const navigate = useNavigate();
    const {
        loading,
        error,
        searchQuery,
        setSearchQuery,
        stats,
        visitorsLast7Days,
        statusData,
        institutionData,
        recentExams,
        handleDownloadReport,
        handleLogout,
        formatDate,
    } = useDashboardPageLogic();

    const [selectedExam, setSelectedExam] = useState(null);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const handleViewReport = (id) => {
        navigate(`/report/${id}`);
    };

    const handleOpenQR = (exam) => {
        setSelectedExam(exam);
        setIsQRModalOpen(true);
    };

    const qrUrl = selectedExam
        ? `${window.location.origin}/report/${selectedExam.token || selectedExam.id}`
        : "";

    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#fff5f7] via-white to-rose-50 text-slate-900 font-poppins">
            <div className="h-full w-full">
                <Sidebar active="dashboard" />

                <main className="h-full space-y-4 overflow-y-auto p-4 sm:p-5 lg:pl-[17.5rem]">
                    <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-100 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2.5 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2">
                            <Search size={15} className="text-slate-400" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama, instansi, status..."
                                className="h-auto w-[200px] border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={handleDownloadReport}
                            >
                                <Download size={14} /> Download Report
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Notifikasi"
                            >
                                <Bell size={15} />
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <User size={14} /> Admin
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut size={14} /> Logout
                            </Button>
                        </div>
                    </header>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <phantom-ui loading={loading} animation="shimmer">
                        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <Card className="border-rose-100 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="p-4">
                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                        Pemeriksaan Hari Ini
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight">
                                        {stats.today}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-rose-100 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="p-4">
                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                        Total Pemeriksaan
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight">
                                        {stats.total}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-rose-100 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="p-4">
                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                        Pending
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-amber-500">
                                        {stats.pending}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border-rose-100 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="p-4">
                                    <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                        Completed
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-500">
                                        {stats.done}
                                    </p>
                                </CardContent>
                            </Card>
                        </section>
                    </phantom-ui>

                    <Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-400">Memuat Visualisasi...</div>}>
                        <DashboardCharts 
                            visitorsLast7Days={visitorsLast7Days} 
                            statusData={statusData} 
                            institutionData={institutionData} 
                        />
                    </Suspense>

                    <section className="grid gap-3 xl:grid-cols-3">
                        <Card className="border-rose-100 bg-white shadow-sm xl:col-span-2">
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between border-b border-rose-100 px-5 py-3.5">
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        Pemeriksaan Terbaru
                                    </h3>
                                    <Button className="gap-1.5" size="sm">
                                        <Plus size={13} /> Pemeriksaan Baru
                                    </Button>
                                </div>

                                <div className="overflow-x-auto rounded-lg border border-slate-100">
                                    <table className="w-full min-w-[680px] text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                <th className="px-4 py-3">
                                                    Nama
                                                </th>
                                                <th className="px-4 py-3">
                                                    Instansi
                                                </th>
                                                <th className="px-4 py-3">
                                                    Tanggal
                                                </th>
                                                <th className="px-4 py-3">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            <phantom-ui loading={loading} count={5} count-gap={8} animation="shimmer">
                                                {loading ? (
                                                    <tr className="transition-colors hover:bg-rose-50/40">
                                                        <td className="px-4 py-3 font-medium text-slate-900">Nama Pasien</td>
                                                        <td className="px-4 py-3 text-slate-600">Instansi Contoh</td>
                                                        <td className="px-4 py-3 text-slate-500">01 Jan 2024</td>
                                                        <td className="px-4 py-3">
                                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700">Completed</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button className="h-8 px-3 text-xs rounded-md border">View</button>
                                                                <button className="h-8 gap-1.5 px-3 text-xs rounded-md bg-[#e86177] text-white">QR</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : recentExams.length > 0 ? (
                                                    recentExams.map((exam) => (
                                                        <tr
                                                            key={exam.id}
                                                            className="transition-colors hover:bg-rose-50/40"
                                                        >
                                                            <td className="px-4 py-3 font-medium text-slate-900">
                                                                {exam.patientName}
                                                            </td>
                                                            <td className="px-4 py-3 text-slate-600">
                                                                {exam.institution}
                                                            </td>
                                                            <td className="px-4 py-3 text-slate-500">
                                                                {formatDate(
                                                                    exam.scanDate,
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span
                                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className="h-8 px-3 text-xs"
                                                                        onClick={() =>
                                                                            handleViewReport(
                                                                                exam.token ||
                                                                                    exam.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        className="h-8 gap-1.5 px-3 text-xs"
                                                                        onClick={() =>
                                                                            handleOpenQR(
                                                                                exam,
                                                                            )
                                                                        }
                                                                    >
                                                                        <QrCode
                                                                            size={
                                                                                13
                                                                            }
                                                                        />
                                                                        QR
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="py-12 text-center">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <ClipboardList size={36} className="text-slate-200" />
                                                                <p className="text-sm text-slate-400">Data pemeriksaan tidak ditemukan.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </phantom-ui>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>


                    </section>
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
                            <Suspense fallback={<div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-50"><span className="text-slate-400 text-xs">Memuat QR...</span></div>}>
                                <QRCodeDisplay url={qrUrl} />
                            </Suspense>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-900">
                                {selectedExam?.patientName}
                            </p>
                            <p className="text-xs text-slate-500">
                                ID Laporan: {selectedExam?.id}
                            </p>
                        </div>

                        <div className="flex w-full gap-2">
                            <Button
                                className="flex-1 gap-2 bg-[#e86177] text-white hover:bg-[#d44d63]"
                                onClick={() => {
                                    const canvas =
                                        document.querySelector("canvas");
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
    );
}
