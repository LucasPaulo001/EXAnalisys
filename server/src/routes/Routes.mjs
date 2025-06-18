import express from "express";
const router = express.Router();

//rotas
import userRouter from "./userRoutes.mjs";


//Config
router.use('/api/users', userRouter);


export default router;