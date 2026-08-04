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
        <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1 className="text-2xl font-semibold mb-8">Welcome back 👋</h1>
            <div className="flex gap-6 flex-wrap">
                <Link href="/admin/blogList" className="border border-black p-6 w-48 shadow-[-5px_5px_0px_#000000]">
                    <p className="text-3xl font-bold">{blogCount}</p>
                    <p className="text-gray-500 mt-1">Total Blogs</p>
                </Link>
                <Link href="/admin/subscriptions" className="border border-black p-6 w-48 shadow-[-5px_5px_0px_#000000]">
                    <p className="text-3xl font-bold">{emailCount}</p>
                    <p className="text-gray-500 mt-1">Subscribers</p>
                </Link>
            </div>
        </div>
    )
}