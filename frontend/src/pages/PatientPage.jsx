import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, Pencil, Eye, Users, X } from "lucide-react";
import { usePatientPageLogic } from "@/hooks/usePatientPageLogic";
import Pagination from "@/components/ui/pagination";

function genderLabel(gender) {
    if (gender === "male") return "Laki-laki";
    if (gender === "female") return "Perempuan";
    return "-";
}

function genderBadge(gender) {
    if (gender === "female") return "bg-pink-100 text-pink-700";
    if (gender === "male") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-500";
}

export default function PatientPage() {
    const {
        navigate,
        patients,
        visiblePatients,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        viewPatient,
        setViewPatient,
        page,
        setPage,
        limit,
        setLimit,
        total,
    } = usePatientPageLogic();

    /* ─── render ─── */
    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 text-slate-900">
            <Sidebar active="pasien" />

            <div className="h-full lg:pl-64">
                <main className="h-full overflow-auto p-3 sm:p-4 space-y-4">
                    {/* Header */}
                    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Data Pasien
                            </h2>
                            <p className="text-sm text-slate-500">
                                Kelola data pasien yang terdaftar di klinik.
                            </p>
                        </div>
                        <Button
                            className="gap-2 text-white bg-violet-500 hover:bg-violet-600"
                            onClick={() => navigate("/pasien/baru")}
                        >
                            <Plus size={16} /> Tambah Pasien
                        </Button>
                    </header>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Table card */}
                    <Card
                        className="border-violet-100 bg-white shadow-sm overflow-hidden flex flex-col"
                        style={{ height: "calc(100vh - 164px)" }}
                    >
                        <CardContent className="p-0 flex flex-col h-full">
                            {/* Search bar */}
                            <div className="p-4 border-b border-violet-50 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 w-full md:w-96">
                                    <Search
                                        size={15}
                                        className="text-slate-400 shrink-0"
                                    />
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari nama, NIS, instansi..."
                                        className="h-auto border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <X
                                                size={13}
                                                className="text-slate-400 hover:text-slate-600"
                                            />
                                        </button>
                                    )}
                                </div>
                                <span className="text-xs text-slate-400">
                                    {total} pasien
                                </span>
                            </div>

                            {/* Table */}
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-violet-100 bg-slate-50/50 text-left text-slate-500">
                                            <th className="px-6 py-3 font-semibold">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 font-semibold">
                                                NIS
                                            </th>
                                            <th className="px-6 py-3 font-semibold">
                                                Instansi
                                            </th>
                                            <th className="px-6 py-3 font-semibold">
                                                Usia
                                            </th>
                                            <th className="px-6 py-3 font-semibold">
                                                Kelamin
                                            </th>
                                            <th className="px-6 py-3 font-semibold text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-violet-50">
                                        {loading ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="py-14 text-center text-slate-400"
                                                >
                                                    Memuat data...
                                                </td>
                                            </tr>
                                        ) : visiblePatients.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="py-14 text-center text-slate-400 italic"
                                                >
                                                    <Users
                                                        size={36}
                                                        className="mx-auto mb-2 text-slate-200"
                                                    />
                                                    Tidak ada data pasien
                                                    ditemukan.
                                                </td>
                                            </tr>
                                        ) : (
                                            visiblePatients.map((p) => (
                                                <tr
                                                    key={p.id}
                                                    className="hover:bg-violet-50/30 transition-colors"
                                                >
                                                    <td className="px-6 py-3 font-medium text-slate-900">
                                                        {p.full_name}
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-500 font-mono text-xs">
                                                        {p.student_id || "-"}
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-600">
                                                        {p.institution_name ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-600">
                                                        {p.age != null
                                                            ? `${p.age} th`
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${genderBadge(p.gender)}`}
                                                        >
                                                            {genderLabel(
                                                                p.gender,
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                                                                title="Lihat detail"
                                                                onClick={() =>
                                                                    setViewPatient(
                                                                        p,
                                                                    )
                                                                }
                                                            >
                                                                <Eye
                                                                    size={14}
                                                                />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-violet-400 hover:text-violet-700 hover:bg-violet-50"
                                                                title="Edit pasien"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/pasien/${p.id}/edit`,
                                                                    )
                                                                }
                                                            >
                                                                <Pencil
                                                                    size={14}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-violet-50 bg-slate-50/30 text-xs text-slate-500 flex items-center justify-between">
                                <span></span>
                                <div className="flex items-center gap-3">
                                    <Pagination
                                        page={page}
                                        totalPages={Math.max(
                                            1,
                                            Math.ceil(total / limit),
                                        )}
                                        onPageChange={setPage}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* ── View Modal (kept as modal since it's read-only) ── */}
            <Dialog
                open={viewPatient !== null}
                onOpenChange={(open) => {
                    if (!open) setViewPatient(null);
                }}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detail Pasien</DialogTitle>
                    </DialogHeader>
                    {viewPatient && (
                        <div className="mt-2 space-y-0">
                            {[
                                {
                                    label: "Nama Lengkap",
                                    value: viewPatient.full_name,
                                },
                                {
                                    label: "NIS / Student ID",
                                    value: viewPatient.student_id || "-",
                                },
                                {
                                    label: "Instansi",
                                    value: viewPatient.institution_name || "-",
                                },
                                {
                                    label: "Tanggal Lahir",
                                    value: viewPatient.date_of_birth
                                        ? new Date(
                                              viewPatient.date_of_birth,
                                          ).toLocaleDateString("id-ID", {
                                              day: "2-digit",
                                              month: "long",
                                              year: "numeric",
                                          })
                                        : "-",
                                },
                                {
                                    label: "Usia",
                                    value:
                                        viewPatient.age != null
                                            ? `${viewPatient.age} tahun`
                                            : "-",
                                },
                                {
                                    label: "Jenis Kelamin",
                                    value: genderLabel(viewPatient.gender),
                                },
                                {
                                    label: "No. Telepon",
                                    value: viewPatient.phone || "-",
                                },
                                {
                                    label: "Alamat",
                                    value: viewPatient.address || "-",
                                },
                                {
                                    label: "Terdaftar",
                                    value: viewPatient.created_at
                                        ? new Date(
                                              viewPatient.created_at,
                                          ).toLocaleDateString("id-ID", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                          })
                                        : "-",
                                },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="flex justify-between border-b border-slate-50 py-2.5"
                                >
                                    <span className="text-sm text-slate-500 shrink-0 w-36">
                                        {label}
                                    </span>
                                    <span className="text-sm font-medium text-slate-800 text-right">
                                        {value}
                                    </span>
                                </div>
                            ))}

                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setViewPatient(null)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    className="flex-1 gap-2 text-white bg-violet-500 hover:bg-violet-600"
                                    onClick={() => {
                                        const patientId = viewPatient.id;
                                        setViewPatient(null);
                                        navigate(`/pasien/${patientId}/edit`);
                                    }}
                                >
                                    <Pencil size={14} /> Edit Pasien
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
