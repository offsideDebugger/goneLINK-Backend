import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config("./.env");


const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected")
    }catch(e){
        console.log("error in connect to database")
    }
}

export default connectDB ;