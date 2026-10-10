import { connectDB } from "@/lib/config/db";
import { Blog } from "@/lib/models/blogs.model";
import cloudinary from "@/lib/config/cloudinary";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const CATEGORIES = ["Startup", "Technology", "Lifestyle"];
// Vercel functions accept request bodies up to 4.5 MB, so keep the image below that
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = request.nextUrl;
        const blogId = searchParams.get("id");

        if (blogId) {
            if (!mongoose.isValidObjectId(blogId)) {
                return NextResponse.json(null, { status: 404 });
            }
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return NextResponse.json(null, { status: 404 });
            }
            return NextResponse.json(blog);
        }

        const pageParam = searchParams.get("page");

        // Without "page": return every blog (the admin panel uses this)
        if (!pageParam) {
            const blogs = await Blog.find({}).sort({ createdAt: -1 });
            return NextResponse.json({ blogs });
        }

        const page = Math.max(1, parseInt(pageParam, 10) || 1);
        const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "3", 10) || 3));
        const category = searchParams.get("category");
        const filter = category && category !== "All" ? { category } : {};

        // Fetch one extra blog to know whether there is another page
        const found = await Blog.find(filter)
            .sort({ createdAt: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit + 1);

        const hasMore = found.length > limit;
        const blogs = found.slice(0, limit);

        return NextResponse.json({ blogs, hasMore });
    } catch (error) {
        console.error("GET /api/blog failed:", error);
        return NextResponse.json({ success: false, message: "Could not load blogs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    let uploadedPublicId: string | undefined;

    try {
        await connectDB();

        const formData = await request.formData();

        const title = String(formData.get("title") ?? "").trim();
        const description = String(formData.get("description") ?? "").trim();
        const category = String(formData.get("category") ?? "").trim();
        const author = String(formData.get("author") ?? "").trim();
        const authorImg = String(formData.get("authorImg") ?? "").trim();
        const image = formData.get("image");

        if (!title || !description || !author || !authorImg) {
            return NextResponse.json({ success: false, message: "Please fill in all the fields" }, { status: 400 });
        }

        if (!CATEGORIES.includes(category)) {
            return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 });
        }

        if (!image || typeof image === "string") {
            return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
        }

        if (!image.type.startsWith("image/")) {
            return NextResponse.json({ success: false, message: "The file must be an image" }, { status: 400 });
        }

        if (image.size > MAX_IMAGE_BYTES) {
            return NextResponse.json({ success: false, message: "Image is too large (max 4 MB)" }, { status: 400 });
        }

        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "blog-app" }, (error, result) => {
                    if (error) {
                        // Log the FULL error so we can see the real reason (bad api key, cloud_name mismatch, etc.)
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                .end(buffer);
        });

        uploadedPublicId = uploadResult.public_id;

        await Blog.create({
            title,
            description,
            category,
            author,
            image: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id,
            authorImg,
        });

        return NextResponse.json({ success: true, message: "Blog Added" });
    } catch (error: any) {
        console.error("POST /api/blog failed:", error);

        // the image was uploaded but the blog was not saved: don't leave an orphan image behind
        if (uploadedPublicId) {
            await cloudinary.uploader.destroy(uploadedPublicId).catch(() => {});
        }

        return NextResponse.json(
            { success: false, message: error?.message || "Something went wrong while adding the blog" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.searchParams.get("id");

        if (!id || !mongoose.isValidObjectId(id)) {
            return NextResponse.json({ success: false, message: "Invalid blog id" }, { status: 400 });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        if (blog.imagePublicId) {
            await cloudinary.uploader.destroy(blog.imagePublicId);
        }

        await Blog.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Blog Deleted" });
    } catch (error) {
        console.error("DELETE /api/blog failed:", error);
        return NextResponse.json({ success: false, message: "Could not delete the blog" }, { status: 500 });
    }
}
