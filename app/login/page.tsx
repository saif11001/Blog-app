"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/admin/login", { password });
            if (response.data.success) {
                router.push("/admin");
            }
        } catch {
            toast.error("Incorrect password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={onSubmit} className="border border-black p-8 shadow-[-7px_7px_0px_#000000] w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full border px-4 py-3 mb-4 outline-none"
                    required
                />
                <button type="submit" className="w-full bg-black text-white py-3">
                    Login
                </button>
            </form>
        </div>
    );
}