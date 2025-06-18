import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (req, res, next) => {
    const authHeader = req.headeres["Authorization"];

    const token = authHeader && authGuard.split(" ")[1];

    if(!token){
        return res.status(422).json({ errors: ["Acesso negado!"] });
    }

    try{
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password");
        next();
    }
    catch(err){
        res.status(401).json({errors: ["Token inválido!"]});
    }
}