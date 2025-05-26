
import ShortUrl from "../models/shortUrlModel.js";
import { GenerateNanoId } from "../utils/NanoIdgen.js";
import dotenv from "dotenv";
dotenv.config("../.env");
const AppUrl=process.env.APP_URL;
export const createUrl = async (req, res) => {
    try {
        const {url} = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const shortUrl = GenerateNanoId(7);
        console.log("\n=== Creating New URL ===");
        console.log("Long URL:", url);
        console.log("Generated Short URL:", shortUrl);
        
        const newUrl = new ShortUrl({
            longUrl: url,
            shortUrl: shortUrl,
            clicks: 0
        });
        if(req.user){
            newUrl.user=req.user._id;
        }

        const savedUrl = await newUrl.save();
        
        
        // Send back the full saved object for verification
        res.json({
            shortUrl: AppUrl+savedUrl.shortUrl,
        });
    } 
    
    catch (error) {
        console.error("Error saving URL:", error);
        res.status(500).json({ error: "Error creating short URL" });
    }

}


export const RedirectToUrl=async (req, res) => {
    try {
        const id = req.params.id;
        
        
        // Try to find the URL with exact match
        const url = await ShortUrl.findOneAndUpdate({ 
            shortUrl: id.trim()  // Trim any whitespace
        },{$inc:{clicks:1}});
        if(url){
            console.log("Redirecting to:", url.longUrl);
            res.redirect(url.longUrl);
        }}
        
        catch(e){
               
            return res.status(404).json({ 
                error: "Short URL not found",
            });
        }}
