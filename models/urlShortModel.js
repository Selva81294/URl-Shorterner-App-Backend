import mongoose from "mongoose";

const urlShortModel = new mongoose.Schema(
    {
        longURL: {
            type: String,
            required: true
        },
        shortURL: {
            type: String,
            unique: true
        },
        clickCount: {
            type: Number,
            default: 0
        }
    }
)

export const URLShort = mongoose.model("urlshort", urlShortModel)