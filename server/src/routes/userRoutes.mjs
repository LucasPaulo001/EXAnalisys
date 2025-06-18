import express from "express";
const userRouter = express.Router();

//Rotas
import { 
    register,
    login
} from "../controllers/UserController.mjs";

//Middlewares
import { 
    userRegisterValidations,
    userLoginValidations
} from "../middlewares/userValidations.mjs";

import { authGuard } from "../middlewares/authGuard.mjs";
import validate from "../middlewares/handleValidation.mjs";

//Config. de rotas
userRouter.post('/register', userRegisterValidations(), validate, register);
userRouter.post('/login', userLoginValidations(), validate, login);

export default userRouter;