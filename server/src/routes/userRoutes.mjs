import express from "express";
const userRouter = express.Router();

//Rotas
import { 
    register,
    login,
    getCurrentUser,
    addExpenses,
    listExpenses,
    editeUser
} from "../controllers/UserController.mjs";

//Middlewares
import { 
    userRegisterValidations,
    userLoginValidations,
    user_Add_Expense_Validation
} from "../middlewares/userValidations.mjs";

import { authGuard } from "../middlewares/authGuard.mjs";
import validate from "../middlewares/handleValidation.mjs";

//Config. de rotas
userRouter.post('/register', userRegisterValidations(), validate, register);
userRouter.post('/login', userLoginValidations(), validate, login);
userRouter.get('/profile', authGuard, getCurrentUser);
userRouter.post('/add-expense', authGuard, user_Add_Expense_Validation(), addExpenses);
userRouter.get('/list-expenses', authGuard, listExpenses);
userRouter.put('/edit-user', authGuard, editeUser);

export default userRouter;

