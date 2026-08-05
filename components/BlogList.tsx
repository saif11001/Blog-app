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
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList () {
    const [menu, setMenu] = useState('All');
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    const categories = ['All', 'Technology', 'Startup', 'Lifestyle'];

    return (
        <div className="bg-(--bg-primary) px-5 md:px-12 lg:px-28 py-12">
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setMenu(cat)}
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
                {blogs.filter((item) => menu === "All"?true:item.category===menu).map((item) => (
                    <BlogItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}