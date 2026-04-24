import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const fetcher = async ([url, token]) => {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal memuat data API");
    }
    return res.json();
};

export function usePatientPageLogic() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewPatient, setViewPatient] = useState(null);

    // pagination state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // debounce searchQuery -> debouncedQuery
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
        return () => clearTimeout(t);
    }, [searchQuery]);

    const token = localStorage.getItem("token");
    const url = `/api/patients?q=${encodeURIComponent(debouncedQuery || "")}&page=${page}&limit=${limit}`;

    const { data: rawData, error: swrError, isLoading } = useSWR(
        token ? [url, token] : null,
        fetcher
    );

    const error = swrError?.message || null;
    const loading = isLoading;

    let patients = [];
    let total = 0;
    if (rawData) {
        if (Array.isArray(rawData)) {
            patients = rawData;
            total = rawData.length;
        } else if (rawData.items) {
            patients = rawData.items;
            total = rawData.total || rawData.items.length;
        }
    }

    // when debounced query changes, reset to first page
    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    // verify auth
    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);
    const visible = useMemo(() => patients, [patients]);

    return {
        navigate,
        patients,
        visiblePatients: visible,
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
    };
}
