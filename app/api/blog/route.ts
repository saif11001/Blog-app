import { connectDB } from "@/lib/config/db";
import { Blog } from "@/lib/models/blogs.model";
import cloudinary from "@/lib/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDB();

    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await Blog.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ blogs });
    }
}

export async function POST(request: NextRequest) {
    await connectDB();

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "blog-app" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            .end(buffer);
    });

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        authorImg: `${formData.get('authorImg')}`,
    };

    await Blog.create(blogData);

    return NextResponse.json({ success: true, message: "Blog Added" });
}

export async function DELETE(request: NextRequest) {
    await connectDB();

    const id = request.nextUrl.searchParams.get("id");
    const blog = await Blog.findById(id);

    if (!blog) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Blog Deleted" });
}