import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReportPageLogic } from "@/hooks/useReportPageLogic";
import { Sidebar } from "@/components/Sidebar";
import {
    LayoutDashboard,
    FileText,
    ClipboardList,
    Download,
    LogOut,
    Calendar,
    ArrowUpRight,
    TrendingUp,
    FileSpreadsheet,
    FilePieChart,
} from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

export default function ReportPage() {
    const {
        navigate,
        stats,
        visitorsLast7Days,
        statusData,
        institutionData,
        handleDownloadReport,
        handleLogout,
    } = useReportPageLogic();

    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 text-slate-900">
            <div className="h-full w-full">
                <Sidebar active="report" />

                <main className="h-full space-y-4 overflow-auto p-3 sm:p-4 lg:pl-[17rem]">
                    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Statistik & Laporan
                            </h2>
                            <p className="text-sm text-slate-500">
                                Analisis data pemeriksaan dan performa instansi.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="gap-2">
                                <Calendar size={16} /> Filter Rentang Waktu
                            </Button>
                            <Button
                                className="gap-2 bg-violet-600 hover:bg-violet-700"
                                onClick={handleDownloadReport}
                            >
                                <Download size={16} /> Download CSV
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleLogout}
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut size={16} />
                            </Button>
                        </div>
                    </header>

                    {/* Summary Cards */}
                    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-violet-100 bg-white shadow-sm overflow-hidden">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Scan
                                    </p>
                                    <TrendingUp
                                        size={16}
                                        className="text-violet-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold">
                                    {stats.total}
                                </h3>
                                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                                    <ArrowUpRight size={12} /> +12% dari bulan
                                    lalu
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white shadow-sm overflow-hidden">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Completed
                                    </p>
                                    <FilePieChart
                                        size={16}
                                        className="text-emerald-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-600">
                                    {stats.done}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    Efisiensi pengerjaan tinggi
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white shadow-sm overflow-hidden">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Pending
                                    </p>
                                    <Calendar
                                        size={16}
                                        className="text-amber-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-amber-500">
                                    {stats.pending}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    Menunggu konfirmasi
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-100 bg-white shadow-sm overflow-hidden">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Export Ready
                                    </p>
                                    <FileSpreadsheet
                                        size={16}
                                        className="text-blue-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold">100%</h3>
                                <p className="text-xs text-slate-400 mt-1">
                                    Semua data terenkripsi
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="grid gap-4 xl:grid-cols-2">
                        {/* Periodic Traffic */}
                        <Card className="border-violet-100 bg-white shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-base font-semibold">
                                        Trafik Pemeriksaan Berkala
                                    </h3>
                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                                        7 Hari Terakhir
                                    </span>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart data={visitorsLast7Days}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#f1f5f9"
                                            />
                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#64748b",
                                                    fontSize: 12,
                                                }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#64748b",
                                                    fontSize: 12,
                                                }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: "12px",
                                                    border: "none",
                                                    boxShadow:
                                                        "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#7c3aed"
                                                strokeWidth={3}
                                                dot={{
                                                    r: 6,
                                                    fill: "#7c3aed",
                                                    strokeWidth: 2,
                                                    stroke: "#fff",
                                                }}
                                                activeDot={{
                                                    r: 8,
                                                    strokeWidth: 0,
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 md:grid-cols-1">
                            {/* Distribution */}
                            <Card className="border-violet-100 bg-white shadow-sm">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="w-1/2">
                                        <h3 className="text-base font-semibold mb-1">
                                            Status Distribusi
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-6">
                                            Persentase status pemeriksaan
                                        </p>
                                        <div className="space-y-3">
                                            {statusData.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="h-2 w-2 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    item.color,
                                                            }}
                                                        />
                                                        <span className="text-slate-600">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-slate-900">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-44">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={statusData}
                                                    dataKey="value"
                                                    innerRadius={50}
                                                    outerRadius={70}
                                                    paddingAngle={5}
                                                >
                                                    {statusData.map((entry) => (
                                                        <Cell
                                                            key={entry.name}
                                                            fill={entry.color}
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Institutions */}
                            <Card className="border-violet-100 bg-white shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="text-base font-semibold mb-6">
                                        Top Instansi Berkontribusi
                                    </h3>
                                    <div className="h-44">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <BarChart
                                                data={institutionData}
                                                layout="vertical"
                                                margin={{ left: 0 }}
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    horizontal={false}
                                                    stroke="#f1f5f9"
                                                />
                                                <XAxis type="number" hide />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    width={80}
                                                    tick={{
                                                        fill: "#64748b",
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: "#f8fafc" }}
                                                    contentStyle={{
                                                        borderRadius: "8px",
                                                        border: "none",
                                                        boxShadow:
                                                            "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="total"
                                                    fill="#8b5cf6"
                                                    radius={[0, 4, 4, 0]}
                                                    barSize={20}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
