"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page () {
    const [blogCount, setBlogCount] = useState(0);
    const [emailCount, setEmailCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            const blogsRes = await axios.get('/api/blog');
            const emailsRes = await axios.get('/api/email');
            setBlogCount(blogsRes.data.blogs.length);
            setEmailCount(emailsRes.data.emails.length);
        };
        fetchStats();
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-5">
            <h1 className="text-2xl font-semibold mb-1 text-(--text-primary)">Welcome back 👋</h1>
            <p className="text-(--text-secondary) mb-12 text-sm">Here's a quick overview of your blog.</p>

            <div className="flex gap-10 flex-wrap justify-center">
                <Link href="/admin/blogList" className="group relative w-44 h-44 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-(--border-color) group-hover:border-(--text-secondary) animate-spin-slow transition-colors"></div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold text-(--text-primary)">{blogCount}</p>
                        <p className="text-(--text-secondary) mt-1 text-sm">Total Blogs</p>
                    </div>
                </Link>

                <Link href="/admin/subscriptions" className="group relative w-44 h-44 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-(--border-color) group-hover:border-(--text-secondary) animate-spin-slow transition-colors"></div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold text-(--text-primary)">{emailCount}</p>
                        <p className="text-(--text-secondary) mt-1 text-sm">Subscribers</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}