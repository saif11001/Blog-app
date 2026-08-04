import { connectDB } from "@/lib/config/db";
import { Email } from "@/lib/models/email.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();

    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }

    try {
        await Email.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed." })
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

export async function GET(request: NextRequest) {
    await connectDB();
    const emails = await Email.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ emails });
}

export async function DELETE(request: NextRequest) {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    await Email.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
}