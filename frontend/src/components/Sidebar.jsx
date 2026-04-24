import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    ClipboardList,
    FileText,
    Users,
    LogOut,
} from "lucide-react";

const NAV_ITEMS = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        key: "pemeriksaan",
        label: "Pemeriksaan",
        icon: ClipboardList,
        path: "/pemeriksaan",
    },
    { key: "pasien", label: "Pasien", icon: Users, path: "/pasien" },
    { key: "report", label: "Report", icon: FileText, path: "/report" },
];

export function Sidebar({ active }) {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("Administrator");
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                if (data && data.full_name) setFullName(data.full_name);
            } catch (e) {
                // keep default
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-violet-100 bg-white px-4 py-6 lg:flex z-30">
            {/* Brand */}
            <div className="mb-8 px-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
                    Sefya Dental Studio
                </p>
                <h1 className="mt-2 text-xl font-bold text-slate-900">
                    Clinic Dashboard
                </h1>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1.5 text-sm">
                {NAV_ITEMS.map((item) => (
                    <Button
                        key={item.key}
                        variant="ghost"
                        className={`justify-start gap-2 ${
                            active === item.key
                                ? "bg-violet-100 text-violet-700 hover:bg-violet-200 font-semibold"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                        onClick={() => navigate(item.path)}
                    >
                        <item.icon size={16} />
                        {item.label}
                    </Button>
                ))}
            </nav>

            {/* Account + Logout */}
            <div className="mt-auto space-y-3">
                <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Akun Aktif
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                        {fullName}
                    </p>
                    <p className="text-xs text-slate-500">
                        Dental Reporting Unit
                    </p>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                >
                    <LogOut size={16} />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
