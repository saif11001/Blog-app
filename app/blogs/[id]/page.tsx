"use client"

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"

interface Blog {
    _id: string;
    title: string;
    description: string;
    author: string;
    image: string;
    authorImg: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page ({params}: PageProps) {
    const { id } = use(params);
    const [data, setData] = useState<Blog | null>(null);
    const [notFound, setNotFound] = useState(false);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: id,
                }
            })
            if (response.data) {
                setData(response.data)
            } else {
                setNotFound(true)
            }
        } catch {
            setNotFound(true)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [id])

    const formattedDate = data
        ? new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "";
    
    return (
        data ? <div className="bg-(--bg-primary) min-h-screen flex flex-col">

            <div className="flex justify-between items-center px-5 md:px-12 lg:px-28 py-5 border-b border-(--border-color)">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={assets.logo} width={150} alt="Logo" className="dark:invert" />
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/"
                        className="hidden sm:block text-sm font-medium py-2 px-5 border border-(--border-color) rounded-full hover:bg-(--bg-secondary) transition-colors text-(--text-primary)"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="flex-1 px-5 py-16 max-w-3xl mx-auto w-full">

                <div className="text-center mb-10">
                    <span className="inline-block bg-(--bg-secondary) text-(--text-secondary) text-xs font-medium px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
                        {data.category}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-semibold leading-tight text-(--text-primary) mb-6">
                        {data.title}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            className="rounded-full object-cover w-14.5 h-14.5 shrink-0"
                            src={data.authorImg}
                            alt=""
                            width={58}
                            height={58}
                        />
                        <div className="text-sm text-left">
                            <p className="text-(--text-primary) font-medium">{data.author}</p>
                            <p className="text-(--text-secondary)">{formattedDate}</p>
                        </div>
                    </div>
                </div>

                <div className="border border-(--border-color) rounded-2xl overflow-hidden bg-(--bg-secondary)">
                    <div className="relative w-full h-64 sm:h-96">
                        <Image
                            className="object-cover"
                            src={data.image}
                            alt={data.title}
                            fill
                            sizes="(min-width: 768px) 768px, 100vw"
                        />
                    </div>

                    <div className="p-6 sm:p-10">
                        <div
                            className="blog-content text-(--text-primary) leading-relaxed"
                            dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.description)}}
                        ></div>

                        <div className="mt-12 pt-8 border-t border-(--border-color) text-center">
                            <p className="text-(--text-secondary) text-sm font-medium mb-4">Share this article</p>
                            <div className="flex gap-3 justify-center">
                                <Image src={assets.facebook_icon} alt="" width={36}/>
                                <Image src={assets.twitter_icon} alt="" width={36}/>
                                <Image src={assets.googleplus_icon} alt="" width={36}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div> :
        <div className="min-h-screen bg-(--bg-primary) flex flex-col items-center justify-center gap-4 px-5 text-center">
            {notFound && (
                <>
                    <p className="text-(--text-primary) text-lg font-medium">Blog not found</p>
                    <Link href="/" className="text-sm font-medium py-2 px-5 border border-(--border-color) rounded-full text-(--text-primary)">
                        Back to Home
                    </Link>
                </>
            )}
        </div>
    )
}