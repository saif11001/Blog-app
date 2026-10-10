"use client"

import { assets } from "@/Assets/assets"
import axios from "axios";
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify";


const AUTHOR_IMG = "https://res.cloudinary.com/a57m0ysa/image/upload/v1791044973/author_img_kpzprh.jpg";

// The server accepts images up to 4 MB (Vercel's request limit is 4.5 MB)
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Phone photos are often 3-6 MB: shrink big images in the browser before uploading
async function shrinkImage(file: File): Promise<File> {
    if (file.size <= 3 * 1024 * 1024) return file;

    try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);

        const ctx = canvas.getContext("2d");
        if (!ctx) return file;
        ctx.fillStyle = "#ffffff"; // PNGs with transparency would turn black as JPEG
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
        if (!blob || blob.size >= file.size) return file;

        return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg" });
    } catch {
        return file;
    }
}

export default function Page() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [inputKey, setInputKey] = useState(0);

    // one preview URL per selected image (instead of a new one on every render)
    const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Saif El-Deen",
        authorImg: AUTHOR_IMG
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

        setLoading(true);
        try {
            const response = await axios.post('/api/blog', formData);

            if (response.data.success) {
                toast.success(response.data.message);
                setImage(null);
                setInputKey((k) => k + 1);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Saif El-Deen",
                    authorImg: AUTHOR_IMG
                })
            } else {
                toast.error("Error");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pt-5 px-5 sm:pt-12 sm:px-16 pb-16">
            <form onSubmit={onSubmitHandler} className="addblog-grid max-w-4xl">

                <div className="area-title">
                    <p className="text-sm font-medium text-(--text-secondary) mb-3">Blog Title</p>
                    <input
                        name="title"
                        onChange={onChangeHandler}
                        value={data.title}
                        className="w-full px-4 py-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) outline-none focus:border-(--text-secondary) transition-colors"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="area-desc">
                    <p className="text-sm font-medium text-(--text-secondary) mb-3">Blog Description</p>
                    <textarea
                        name="description"
                        onChange={onChangeHandler}
                        value={data.description}
                        className="w-full px-4 py-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) outline-none focus:border-(--text-secondary) transition-colors"
                        placeholder="Write content here"
                        rows={8}
                        required
                    />
                    <p className="mt-2 text-xs text-(--text-secondary)">
                        You can use HTML tags such as &lt;p&gt;, &lt;h2&gt; and &lt;b&gt; to format the post.
                    </p>
                </div>

                <div className="area-image flex flex-col h-full">
                    <p className="text-sm font-medium text-(--text-secondary) mb-3">Upload thumbnail</p>
                    <label htmlFor="image" className="cursor-pointer block flex-1">
                        <div className="w-full h-56 lg:h-full rounded-2xl border border-dashed border-(--border-color) bg-(--bg-secondary) flex items-center justify-center overflow-hidden">
                            <Image
                                style={{ width: '100%', height: '100%', objectFit: image ? 'cover' : 'contain' }}
                                src={previewUrl ?? assets.upload_area}
                                alt=""
                                width={300}
                                height={300}
                                className={!image ? "p-10 opacity-60 dark:invert" : ""}
                            />
                        </div>
                    </label>
                    <input key={inputKey} type="file" id="image" hidden accept="image/*"
                        onChange={async (e) => {
                            const input = e.target;
                            const file = input.files?.[0];
                            if (!file) return;

                            const prepared = await shrinkImage(file);
                            if (prepared.size > MAX_IMAGE_BYTES) {
                                toast.error("Image is too large (max 4 MB)");
                                input.value = "";
                                return;
                            }
                            setImage(prepared);
                        }}
                    />
                </div>

                <div className="area-catrow flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-(--text-secondary) mb-3">Blog Category</p>
                        <select
                            name="category"
                            onChange={onChangeHandler}
                            value={data.category}
                            className="w-44 px-4 py-3 rounded-xl border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) outline-none focus:border-(--text-secondary) transition-colors"
                        >
                            <option value="Startup">Startup</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-full bg-(--text-primary) text-(--bg-primary) font-medium disabled:opacity-60 transition-opacity self-end"
                    >
                        {loading ? "Adding..." : "Add Blog"}
                    </button>
                </div>

            </form>
        </div>
    )
}
