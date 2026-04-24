import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronLeft,
    Save,
    User,
    Building2,
    Phone,
    MapPin,
} from "lucide-react";
import { useTambahPasienPageLogic } from "@/hooks/useTambahPasienPageLogic";

export default function TambahPasienPage() {
    const {
        navigate,
        isEdit,
        form,
        setForm,
        institutions,
        loading,
        saving,
        error,
        handleSave,
        setField,
    } = useTambahPasienPageLogic();

    /* ─── loading state ─── */
    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
                    <p className="text-sm text-slate-500">
                        Memuat data pasien...
                    </p>
                </div>
            </div>
        );
    }

    /* ─── render ─── */
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 text-slate-900">
            <Sidebar active="pasien" />

            <div className="lg:pl-64">
                <main className="min-h-screen p-3 sm:p-4 space-y-4 pb-10">
                    {/* ── Header ── */}
                    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl hover:bg-violet-50"
                                onClick={() => navigate("/pasien")}
                            >
                                <ChevronLeft size={20} />
                            </Button>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {isEdit ? "Edit Pasien" : "Tambah Pasien"}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {isEdit
                                        ? "Ubah data pasien yang sudah terdaftar."
                                        : "Daftarkan pasien baru ke dalam sistem."}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/pasien")}
                                disabled={saving}
                            >
                                Batal
                            </Button>
                            <Button
                                className="gap-2 text-white bg-violet-500 hover:bg-violet-600"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                <Save size={16} />
                                {saving
                                    ? "Menyimpan..."
                                    : isEdit
                                      ? "Update Pasien"
                                      : "Simpan Pasien"}
                            </Button>
                        </div>
                    </header>

                    {/* Error banner */}
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* ── Content Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* ── LEFT COLUMN: Patient Identity ── */}
                        <div className="space-y-4">
                            {/* Instansi & Identitas */}
                            <Card className="border-violet-100 bg-white shadow-sm overflow-visible">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                            <Building2
                                                size={16}
                                                className="text-violet-600"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Instansi & Identitas
                                        </h3>
                                    </div>

                                    {/* Instansi */}
                                    <div>
                                        <Label className="text-slate-600">
                                            Instansi{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            value={form.institution_id}
                                            onValueChange={(v) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    institution_id: v,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Pilih instansi..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {institutions.map((inst) => (
                                                    <SelectItem
                                                        key={inst.id}
                                                        value={inst.id}
                                                    >
                                                        {inst.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Nama Lengkap */}
                                    <div>
                                        <Label className="text-slate-600">
                                            Nama Lengkap{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            className="mt-1"
                                            value={form.full_name}
                                            onChange={setField("full_name")}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    {/* NIS */}
                                    <div>
                                        <Label className="text-slate-600">
                                            NIS / Student ID
                                        </Label>
                                        <Input
                                            className="mt-1"
                                            value={form.student_id}
                                            onChange={setField("student_id")}
                                            placeholder="AH-2024-XXXX"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Personal Details */}
                            <Card className="border-violet-100 bg-white shadow-sm">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                            <User
                                                size={16}
                                                className="text-violet-600"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Data Pribadi
                                        </h3>
                                    </div>

                                    {/* Jenis Kelamin */}
                                    <div>
                                        <Label className="text-slate-600">
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            value={form.gender}
                                            onValueChange={(v) =>
                                                setForm((f) => ({
                                                    ...f,
                                                    gender: v,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Pilih..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Tanggal Lahir + Usia */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-slate-600">
                                                Tanggal Lahir
                                            </Label>
                                            <Input
                                                className="mt-1"
                                                type="date"
                                                value={form.date_of_birth}
                                                onChange={setField(
                                                    "date_of_birth",
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-slate-600">
                                                Usia (tahun)
                                            </Label>
                                            <Input
                                                className="mt-1"
                                                type="number"
                                                min={0}
                                                max={120}
                                                value={form.age}
                                                onChange={setField("age")}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* ── RIGHT COLUMN: Contact & Address ── */}
                        <div className="space-y-4">
                            {/* Kontak */}
                            <Card className="border-violet-100 bg-white shadow-sm">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                            <Phone
                                                size={16}
                                                className="text-violet-600"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Kontak
                                        </h3>
                                    </div>

                                    <div>
                                        <Label className="text-slate-600">
                                            No. Telepon
                                        </Label>
                                        <Input
                                            className="mt-1"
                                            value={form.phone}
                                            onChange={setField("phone")}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Alamat */}
                            <Card className="border-violet-100 bg-white shadow-sm">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                                            <MapPin
                                                size={16}
                                                className="text-violet-600"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">
                                            Alamat
                                        </h3>
                                    </div>

                                    <div>
                                        <Label className="text-slate-600">
                                            Alamat Lengkap
                                        </Label>
                                        <Textarea
                                            className="mt-1 resize-none text-sm"
                                            rows={4}
                                            value={form.address}
                                            onChange={setField("address")}
                                            placeholder="Masukkan alamat lengkap pasien..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action summary card (mobile-friendly) */}
                            <Card className="border-violet-100 bg-white shadow-sm lg:hidden">
                                <CardContent className="p-5">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => navigate("/pasien")}
                                            disabled={saving}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            className="flex-1 gap-2 bg-violet-600 hover:bg-violet-700"
                                            onClick={handleSave}
                                            disabled={saving}
                                        >
                                            <Save size={16} />
                                            {saving
                                                ? "Menyimpan..."
                                                : isEdit
                                                  ? "Update"
                                                  : "Simpan"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
