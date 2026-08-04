"use client"

import { assets } from "@/Assets/assets"
import axios from "axios";
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify";

export default function Page() {
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Saif El-Deen",
        authorImg: "/author_img.png"
    })

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));

    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        if (!image) {
            toast.error("Please select an image");
            return;
        }
        formData.append("image", image);

        try {
            const response = await axios.post('/api/blog', formData);

            if (response.data.success) {
                toast.success(response.data.message);
                setImage(null);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Saif El-Deen",
                    authorImg: "/author_img.png"
                })
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
                <p className="text-xl">Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className="mt-4" style={{ width: '140px', height: 'auto' }} src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" width={140} height={70} />
                </label>
                <input type="file" id="image" hidden required onChange={(e) => { if (e.target.files?.[0]) setImage(e.target.files[0]) }} />
                <p className="text-xl mt-4">Blog Title</p>
                <input name="title" onChange={onChangeHandler} value={data.title} className="w-full sm:w-125 mt-4 px-4 py-3 border" type="text" placeholder="Type here" required />
                <p className="text-xl mt-4">Blog Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className="w-full sm:w-125 mt-4 px-4 py-3 border" placeholder="Write content here" rows={6} required />
                <p className="text-xl mt-4">Blog Category</p>
                <select name="category" onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-3 border text-gray-500">
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
            </form>
        </>
    )
}