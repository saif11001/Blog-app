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

import { blog_data } from "@/Assets/assets";
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
    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={() => setMenu('All')} className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>All</button>
                <button onClick={() => setMenu('Technology')} className={menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>Technology</button>
                <button onClick={() => setMenu('Startup')} className={menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>Startup</button>
                <button onClick={() => setMenu('Lifestyle')} className={menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>Lifestyle</button>
            </div>

            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                
                {blogs.filter((item) => menu === "All"?true:item.category===menu).map((item) => (
                    <BlogItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}