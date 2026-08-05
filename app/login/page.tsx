"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/admin/login", { password });
            if (response.data.success) {
                router.push("/admin");
            }
        } catch {
            toast.error("Incorrect password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-(--bg-primary)">
            <div className="flex justify-between items-center px-5 md:px-12 lg:px-28 py-5 border-b border-(--border-color)">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={assets.logo} width={150} height={150} alt="Logo" className="dark:invert" />
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/"
                        className="text-sm font-medium py-2 px-5 border border-(--border-color) rounded-full hover:bg-(--bg-secondary) transition-colors text-(--text-primary)"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-5 py-16">
                <form onSubmit={onSubmit} className="border border-(--border-color) rounded-2xl p-8 w-full max-w-sm bg-(--bg-secondary)">
                    <h1 className="text-2xl font-semibold mb-1 text-center text-(--text-primary)">Admin Login</h1>
                    <p className="text-sm text-(--text-secondary) text-center mb-6">Enter your password to continue</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="w-full border border-(--border-color) rounded-full px-5 py-3 mb-4 outline-none bg-(--bg-primary) text-(--text-primary) placeholder:text-(--text-secondary) text-center"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-(--text-primary) text-(--bg-primary) py-3 rounded-full font-medium disabled:opacity-60 transition-opacity"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
}