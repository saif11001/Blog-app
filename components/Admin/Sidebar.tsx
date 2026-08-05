"use client"

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin/addProduct", icon: assets.add_icon, label: "Add Blogs" },
        { href: "/admin/blogList", icon: assets.blog_icon, label: "Blog Lists" },
        { href: "/admin/subscriptions", icon: assets.email_icon, label: "Subscriptions" },
    ];

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-30 sm:hidden"
                ></div>
            )}

            <div
                className={`
                    flex flex-col bg-(--bg-secondary) h-screen border-r border-(--border-color)
                    fixed sm:sticky top-0 left-0 z-40
                    w-64 shrink-0
                    transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    sm:translate-x-0
                `}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-(--border-color)">
                    <Link href={'/admin'} onClick={onClose}>
                        <Image src={assets.logo} alt="" width={110} priority className="dark:invert" />
                    </Link>
                    <button
                        onClick={onClose}
                        className="sm:hidden text-(--text-primary) text-xl leading-none"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 py-8">
                    <div className="w-full px-5 flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 font-medium px-3 py-2.5 rounded-full transition-colors ${isActive
                                            ? "bg-(--text-primary) text-(--bg-primary)"
                                            : "text-(--text-primary) hover:bg-(--bg-primary)"
                                        }`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        width={20}
                                        className={isActive ? "invert dark:invert-0" : "dark:invert"}
                                    />
                                    <p className="text-sm">{item.label}</p>
                                </Link>
                            );
                        })}

                        <button
                            onClick={async () => {
                                await fetch('/api/admin/logout', { method: 'POST' });
                                window.location.href = '/login';
                            }}
                            className="flex items-center justify-center font-medium px-3 py-2.5 rounded-full text-(--text-primary) hover:bg-(--bg-primary) transition-colors mt-2"
                        >
                            <p className="text-sm">Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}