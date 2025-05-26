import express from 'express';
import cors from 'cors';
import router from './src/routes/shortUrl.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { RedirectToUrl } from './src/controller/ControllerUrl.js';
import connectDB from './src/config/mongo.config.js';
dotenv.config("./.env");

const app= express();
const PORT= process.env.PORT || 4000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/create",router)
app.get("/:id",RedirectToUrl)

app.listen(PORT, () =>{ 
    connectDB();
    console.log(`Server running on port ${PORT}`)
});