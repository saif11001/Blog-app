"use client";

import { assets } from "@/Assets/assets"
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

export default function Header () {

    const [email, setEmail] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        try {
            const response = await axios.post('/api/email', formData);
            if(response.data.success) {
                toast.success(response.data.msg);
                setEmail("");
            }
        } catch (error: any) {
            const msg = error.response?.data?.msg || "Something went wrong";
            toast.error(msg);
        }
    }

    return (
        <div className="bg-[varbg-(--bg-primary) text-(--text-primary) border-b border-(--border-color)">
            <div className="flex justify-between items-center px-5 md:px-12 lg:px-28 py-5">
                <div className="flex items-center gap-2">
                    <Image src={assets.logo} width={150} height={150} alt="Logo" className="dark:invert" />
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-(--text-secondary)">
                    <a href="/" className="hover:text-(--text-primary) transition-colors">Home</a>
                    <a href="/admin" className="hover:text-(--text-primary) transition-colors">Admin</a>
                    <a href="/about" className="hover:text-(--text-primary) transition-colors">About</a>
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button className="hidden sm:flex items-center gap-2 text-sm font-medium py-2 px-5 border border-(--border-color) rounded-full hover:bg-(--bg-secondary) transition-colors">
                        Subscribe
                    </button>

                    {/* Mobile menu toggle button - only visible below md breakpoint */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-(--border-color) text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <nav className="flex flex-col gap-1 px-5 pb-5 text-sm font-medium text-(--text-secondary)">
                    <a
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 border-b border-(--border-color) hover:text-(--text-primary) transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 border-b border-(--border-color) hover:text-(--text-primary) transition-colors"
                    >
                        Admin
                    </a>
                    <a
                        href="#"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 border-b border-(--border-color) hover:text-(--text-primary) transition-colors"
                    >
                        About
                    </a>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="mt-3 flex items-center justify-center gap-2 text-sm font-medium py-2 px-5 border border-(--border-color) rounded-full hover:bg-(--bg-secondary) transition-colors sm:hidden"
                    >
                        Subscribe
                    </button>
                </nav>
            </div>

            <div className="text-center px-5 pb-16 pt-6">
                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Where Next?</h1>
                <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-(--text-secondary)">
                    Stories, guides, and ideas worth reading — curated for the curious.
                </p>
                <form onSubmit={onSubmitHandler} className="flex max-w-md mx-auto mt-8 border border-(--border-color) rounded-full overflow-hidden bg-(--bg-secondary)">
                    <input
                        onChange={(e) => {setEmail(e.target.value)}}
                        value={email}
                        type="email"
                        placeholder="Enter your e-mail"
                        className="flex-1 px-5 py-3 bg-transparent outline-none text-sm"
                    />
                    <button type="submit" className="px-6 py-3 bg-(--text-primary) text-(--bg-primary) text-sm font-medium">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    )
}