import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
    },
    {
        timestamps: true
    }
);

export const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);
