import User from "../models/User.mjs";
import Expense from "../models/Expense.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//Função para gerar o token do usuário
const generateToken = (id) => {
    return jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: "7d" }
    )
}

//Função de registro de usuário
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try{

        //Validação
        const user = await User.findOne({ email });

        if(user){
            return res.status(422).json({ errors: ["Usuário já existe!"] });
        }

        //Criptografia de senha
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, salt);

        //Criando o usuário no banco
        const newUser = await User.create({
            username,
            email,
            password: hashPass,
        });

        await newUser.save();

        res.status(200).json({ success: "Registro feito com sucesso!" });

    }
    catch(err){
        res.status(500).json({ errors: ["Erro interno do servidor!"] });
    }
}

//Função para login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try{

        const user = await User.findOne({ email })

        if(!user){
            return res.status(422).json({ 
                errors: ["Usuário não encontrado, cadastre-se para ter acesso!"] 
            });
        }

        if(!(await bcrypt.compare(password, user.password))){
            return res.status(422).json({ errors: ["Senha incorreta!"] });
        }

        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id)
        });


    }
    catch(err){
        res.status(500).json({ errors: ["Erro interno do servidor!"] });
    }
}

//Pegando dados de usuários logado
export const getCurrentUser = async (req, res) => {
    const user = req.user;
    console.log(user);
    res.status(200).json(user);
}

//Editar dados do usuário
export const editeUser = async (req, res) => {
    const {
        username,
        password,
        totalBalance
    } = req.body;

    try{

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({ errors: ["Usuário não encontrado!"] });
        }

        if(username){
            user.username = username;
        }

        if(password){
            const salts = await bcrypt.genSalt();
            const hashPass = await bcrypt.hash(password, salts);
            user.password = hashPass;
        }

        if(totalBalance && totalBalance < 0){
            return res.status(422).json({ errors: ["Você não pode inserir um valor negativo!"] });
        }

        if(totalBalance){
            user.totalBalance = totalBalance;
        }

        await user.save();

        res.status(201).json({ msg: "Usuário salvo com sucesso!" });

    }
    catch(err){ 
        res.status(500).json({ errors: ["Erro interno do servidor!"] });
        console.log(err);
    }
}


//Adição de gastos
export const addExpenses = async (req, res) => {
    const { 
        value,
        description,
        category,
        date,
        paymentMethod
    } = req.body;

    const authorExpense = req.user._id

    try{

        const newExpense = await Expense.create({
            author: authorExpense,
            value,
            description,
            category,
            date,
            paymentMethod
        });

        res.status(201).json({
            msg: "Despesa adicionada com sucesso!",
            expense: newExpense
        });
    }
    catch(err){
        res.status(500).json({ errors: ["Erro interno do servidor!"] });
        console.log(err);
    }
}

//Listar gastos
export const listExpenses = async (req, res) => {
    try{

        const expenses = await Expense.find();

        res.status(200).json(
            expenses
        );

    }
    catch(err){
        res.status(500).json({ errors: ["Erro interno do servidor!"] });
        console.log(err);
    }
}