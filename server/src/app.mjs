import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();

//Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Conexão do banco de dados
import { connectDB } from "./settings/database/dbConnection.mjs";
connectDB(app);

//Rotas
import router from "./routes/Routes.mjs";
app.use(router);

//Conexão com o servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT} 🚀`);
})