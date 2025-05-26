import mongoose, { Mongoose } from "mongoose";



const shortUrlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;