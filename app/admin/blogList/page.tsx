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
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1>All Blogs</h1>
            <div className="relative max-w-212.5 overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="hidden sm:block px-6 py-3">Author name</th>
                            <th scope="col" className="px-6 py-3">Blog Title</th>
                            <th scope="col" className="px-6 py-3">Blog Date</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => {
                            return <BlogTableItem key={item._id} mongoId={item._id} title={item.title} authorImg={item.authorImg} author={item.author} date={item.createdAt} deleteBlog={deleteBlog}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}