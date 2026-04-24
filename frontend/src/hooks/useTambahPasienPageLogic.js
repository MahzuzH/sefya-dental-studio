import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const authFetch = (url, opts = {}) =>
  fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...(opts.headers || {}),
    },
  });

const EMPTY_FORM = {
  institution_id: "",
  full_name: "",
  student_id: "",
  date_of_birth: "",
  age: "",
  gender: "",
  address: "",
  phone: "",
};

export function useTambahPasienPageLogic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    // fetch institutions
    authFetch("/api/institutions")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setInstitutions(d);
      })
      .catch(() => {});

    // if edit mode, load existing patient
    if (isEdit) {
      setLoading(true);
      authFetch(`/api/patients/${id}`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.id) {
            navigate("/pasien");
            return;
          }
          setForm({
            institution_id: d.institution_id || "",
            full_name: d.full_name || "",
            student_id: d.student_id || "",
            date_of_birth: d.date_of_birth || "",
            age: d.age != null ? String(d.age) : "",
            gender: d.gender || "",
            address: d.address || "",
            phone: d.phone || "",
          });
        })
        .catch(() => navigate("/pasien"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, navigate]);

  const handleSave = async () => {
    setError("");
    if (!form.institution_id) {
      setError("Instansi wajib dipilih.");
      return;
    }
    if (!form.full_name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        institution_id: form.institution_id,
        full_name: form.full_name.trim(),
        student_id: form.student_id.trim(),
        date_of_birth: form.date_of_birth || undefined,
        age: form.age ? parseInt(form.age, 10) : undefined,
        gender: form.gender || undefined,
        address: form.address.trim() || undefined,
        phone: form.phone.trim() || undefined,
      };

      const url = isEdit ? `/api/patients/${id}` : "/api/patients";
      const method = isEdit ? "PUT" : "POST";

      const res = await authFetch(url, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan data");

      navigate("/pasien");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return {
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
  };
}
