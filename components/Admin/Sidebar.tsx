"use client"

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="flex flex-col bg-slate-100">
            <Link href={'/admin'} className="px-2 sm:pl-14 py-3 border border-black">
                <Image src={assets.logo} alt="" width={120} priority />
            </Link>
            <div className="w-28 sm:w-80 h-screen relative py-12  border border-black">
                <div className="w-[%50] sm:w-[80%] absolute right-0">
                    <Link href={'/admin/addProduct'} className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.add_icon} alt="" width={28} /><p>Add Blogs</p>
                    </Link>
                    <Link href={'/admin/blogList'} className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.blog_icon} alt="" width={28} /><p>Blog Lists</p>
                    </Link>
                    <Link href={'/admin/subscriptions'} className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.email_icon} alt="" width={28} /><p>Subscriptions</p>
                    </Link>
                    <button
                        onClick={async () => {
                            await fetch('/api/admin/logout', { method: 'POST' });
                            window.location.href = '/login';
                        }}
                        className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] w-full"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}