import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (app) => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Conectado ao mongoDB 🍃");
    }
    catch(err){
        console.log(`Erro ao se conectar ao mongoDB (local): ${err}`);
    }

}

