"use client"

import BlogTableItem from "@/components/Admin/BlogTableItem"
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

interface Blog {
    _id: string;
    title: string;
    description: string;
    author: string;
    image: string;
    authorImg: string;
    category: string;
    createdAt: string;
}

export default function Page () {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
    }

    const deleteBlog = async (mongoId: string) => {
        const response = await axios.delete('/api/blog', {
            params: {
                id: mongoId
            }
        });
        toast.success(response.data.message);
        
        fetchBlogs();
    }

    useEffect(() => {
        fetchBlogs();

    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:px-16 pb-16">
            <h1 className="text-2xl font-semibold text-(--text-primary) mb-1">All Blogs</h1>
            <p className="text-(--text-secondary) text-sm mb-6">{blogs.length} blog{blogs.length !== 1 ? "s" : ""} published</p>

            <div className="relative max-w-4xl overflow-x-auto rounded-2xl border border-(--border-color) scrollbar-hide">
                <table className="w-full text-sm">
                    <thead className="text-xs text-(--text-secondary) text-left uppercase bg-(--bg-secondary)">
                        <tr>
                            <th scope="col" className="hidden sm:table-cell px-6 py-4">Author name</th>
                            <th scope="col" className="px-6 py-4">Blog Title</th>
                            <th scope="col" className="px-6 py-4">Blog Date</th>
                            <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--border-color)">
                        {blogs.map((item) => {
                            return <BlogTableItem key={item._id} mongoId={item._id} title={item.title} authorImg={item.authorImg} author={item.author} date={item.createdAt} deleteBlog={deleteBlog}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}