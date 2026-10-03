"use client"

export interface Blog {
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

import BlogItem from "./BlogItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 3;

export default function BlogList () {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const categories = ['All', 'Technology', 'Startup', 'Lifestyle'];

    // تحميل صفحة (3 بلوجات) كل ما يتغير القسم أو رقم الصفحة
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/blog', {
                    params: { page, limit: PAGE_SIZE, category: menu },
                });
                if (cancelled) return;

                const newBlogs: Blog[] = response.data.blogs;
                setBlogs((prev) => {
                    if (page === 1) return newBlogs;
                    const ids = new Set(prev.map((b) => b._id));
                    return [...prev, ...newBlogs.filter((b) => !ids.has(b._id))];
                });
                setHasMore(response.data.hasMore);
            } catch {
                if (!cancelled) setHasMore(false);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [menu, page]);

    // لما العنصر اللي تحت القايمة يظهر على الشاشة، نحمّل الصفحة اللي بعدها
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el || loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoading(true);
                    setPage((p) => p + 1);
                }
            },
            { rootMargin: "300px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [loading, hasMore, blogs.length]);

    const changeCategory = (cat: string) => {
        if (cat === menu) return;
        setMenu(cat);
        setBlogs([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
    };

    return (
        <div className="bg-(--bg-primary) px-5 md:px-12 lg:px-28 py-12">
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => changeCategory(cat)}
                        className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                            menu === cat
                                ? "bg-(--text-primary) text-(--bg-primary) border-(--text-primary)"
                                : "border-(--border-color) text-(--text-secondary) hover:bg-(--bg-secondary)"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {blogs.map((item) => (
                    <BlogItem key={item._id} item={item} />
                ))}

                {loading &&
                    Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <div
                            key={`skeleton-${i}`}
                            className="h-80 rounded-2xl bg-(--bg-secondary) animate-pulse"
                        />
                    ))}
            </div>

            {!loading && blogs.length === 0 && (
                <p className="text-center text-(--text-secondary) text-sm mt-6">No blogs yet.</p>
            )}

            {hasMore && <div ref={sentinelRef} className="h-4" />}
        </div>
    )
}