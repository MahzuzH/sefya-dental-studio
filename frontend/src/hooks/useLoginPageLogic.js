import { useState } from "react";

export function useLoginPageLogic(onLoginSuccess) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Email dan password wajib diisi");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // simpan token
                localStorage.setItem("token", data.token);

                // redirect without full page reload to keep SPA routing stable
                if (typeof onLoginSuccess === "function") {
                    onLoginSuccess();
                } else {
                    window.location.assign("/dashboard");
                }
            } else {
                alert(data.error || "Login gagal");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }

        setLoading(false);
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleLogin,
    };
}
