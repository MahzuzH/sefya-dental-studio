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
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 text-slate-900 transition-colors">
            <div className="h-full w-full">
                <Sidebar active="dashboard" />

                <main className="h-full space-y-3 overflow-hidden p-3 sm:p-4 lg:pl-[17rem]">
                    <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-violet-100 bg-white p-3 shadow-sm">
                        <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2">
                            <Search size={16} className="text-slate-500" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama, instansi, status..."
                                className="h-auto w-[220px] border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={handleDownloadReport}
                            >
                                <Download size={15} /> Download Report
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Notifikasi"
                            >
                                <Bell size={16} />
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <User size={16} /> Admin
                            </Button>
                            <Button
                                variant="destructive"
                                className="gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    </header>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <Card className="border-violet-100 bg-white">
                            <CardContent className="p-3">
                                <p className="text-sm text-slate-500">
                                    Pemeriksaan Hari Ini
                                </p>
                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.today}
                                </h2>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white">
                            <CardContent className="p-3">
                                <p className="text-sm text-slate-500">
                                    Total Pemeriksaan
                                </p>
                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.total}
                                </h2>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white">
                            <CardContent className="p-3">
                                <p className="text-sm text-slate-500">
                                    Pending
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-amber-500">
                                    {stats.pending}
                                </h2>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white">
                            <CardContent className="p-3">
                                <p className="text-sm text-slate-500">
                                    Completed
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-emerald-500">
                                    {stats.done}
                                </h2>
                            </CardContent>
                        </Card>
                    </section>

                    <Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-400">Memuat Visualisasi...</div>}>
                        <DashboardCharts 
                            visitorsLast7Days={visitorsLast7Days} 
                            statusData={statusData} 
                            institutionData={institutionData} 
                        />
                    </Suspense>

                    <section className="grid gap-3 xl:grid-cols-3">
                        <Card className="border-violet-100 bg-white xl:col-span-2">
                            <CardContent className="p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-base font-semibold">
                                        Pemeriksaan Terbaru
                                    </h3>
                                    <Button className="gap-2" size="sm">
                                        <Plus size={14} /> Pemeriksaan Baru
                                    </Button>
                                </div>

                                {loading ? (
                                    <p className="text-sm text-slate-500">
                                        Loading data...
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[680px] text-xs sm:text-sm">
                                            <thead>
                                                <tr className="border-b border-violet-100 text-left text-slate-500">
                                                    <th className="py-2">
                                                        Nama
                                                    </th>
                                                    <th className="py-2">
                                                        Instansi
                                                    </th>
                                                    <th className="py-2">
                                                        Tanggal
                                                    </th>
                                                    <th className="py-2">
                                                        Status
                                                    </th>
                                                    <th className="py-2 text-center">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentExams.map((exam) => (
                                                    <tr
                                                        key={exam.id}
                                                        className="border-b border-violet-50"
                                                    >
                                                        <td className="py-2 font-medium">
                                                            {exam.patientName}
                                                        </td>
                                                        <td className="py-2">
                                                            {exam.institution}
                                                        </td>
                                                        <td className="py-2">
                                                            {formatDate(
                                                                exam.scanDate,
                                                            )}
                                                        </td>
                                                        <td className="py-2">
                                                            <span
                                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                                    exam.status ===
                                                                    "Completed"
                                                                        ? "bg-emerald-100 text-emerald-700"
                                                                        : "bg-amber-100 text-amber-700"
                                                                }`}
                                                            >
                                                                {exam.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-2">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
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
                                                                    className="gap-1"
                                                                    onClick={() =>
                                                                        handleOpenQR(
                                                                            exam,
                                                                        )
                                                                    }
                                                                >
                                                                    <QrCode
                                                                        size={
                                                                            14
                                                                        }
                                                                    />{" "}
                                                                    QR
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {!recentExams.length && (
                                            <p className="py-4 text-center text-sm text-slate-500">
                                                Data pemeriksaan tidak
                                                ditemukan.
                                            </p>
                                        )}
                                    </div>
                                )}
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
                        <div className="rounded-2xl border-4 border-violet-100 bg-white p-4 shadow-xl shadow-violet-100/50">
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
                                className="flex-1 gap-2 bg-violet-600 hover:bg-violet-700"
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
