import User from "../models/User.mjs";
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