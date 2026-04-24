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
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardCharts({ visitorsLast7Days, statusData, institutionData }) {
    return (
        <>
            <section className="grid gap-3 xl:grid-cols-3">
                <Card className="border-violet-100 bg-white xl:col-span-2">
                    <CardContent className="p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-base font-semibold">
                                Visualisasi Pengunjung (7 Hari)
                            </h3>
                            <span className="text-xs text-slate-500">
                                Berdasarkan tanggal scan
                            </span>
                        </div>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={visitorsLast7Days}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="day" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#7c3aed"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-violet-100 bg-white">
                    <CardContent className="p-3">
                        <h3 className="mb-2 text-base font-semibold">
                            Status Pemeriksaan
                        </h3>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={2}
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

                        <div className="space-y-1.5">
                            {statusData.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="font-semibold">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="mt-3">
                <Card className="border-violet-100 bg-white">
                    <CardContent className="p-3">
                        <h3 className="mb-2 text-base font-semibold">
                            Top Instansi
                        </h3>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={institutionData}
                                    layout="vertical"
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis
                                        type="number"
                                        allowDecimals={false}
                                    />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={90}
                                    />
                                    <Tooltip />
                                    <Bar
                                        dataKey="total"
                                        fill="#8b5cf6"
                                        radius={[0, 8, 8, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}
