import { connectDB } from "@/lib/config/db";
import { Email } from "@/lib/models/email.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const formData = await request.formData();
        const email = String(formData.get("email") ?? "").trim().toLowerCase();

        if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { success: false, msg: "Please enter a valid email." },
                { status: 400 }
            );
        }

        await Email.create({ email });
        return NextResponse.json({ success: true, msg: "Email Subscribed." });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, msg: "This email is already subscribed." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { success: false, msg: "Something went wrong." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const emails = await Email.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ emails });
    } catch (error) {
        console.error("GET /api/email failed:", error);
        return NextResponse.json({ success: false, msg: "Could not load subscribers." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.searchParams.get("id");

        if (!id || !mongoose.isValidObjectId(id)) {
            return NextResponse.json({ success: false, msg: "Invalid id" }, { status: 400 });
        }

        await Email.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        console.error("DELETE /api/email failed:", error);
        return NextResponse.json({ success: false, msg: "Could not delete the email." }, { status: 500 });
    }
}
