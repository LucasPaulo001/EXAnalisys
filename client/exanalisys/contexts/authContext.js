import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const register = async (username, email, password, repeatPass) => {
        const registerAPI = 'https://exanalisys.onrender.com/api/users/register';

        try {

            const res = await fetch(registerAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, repeatPass })
            });

            const data = await res.json();

            console.log("Resposta da API:", res.status, data);

            if (!res.ok) {
                setError(data.errors);
                return { success: false, message: data.message || "Erro ao registrar" };
            }

            if(res.ok){
                setSuccess("Cadastro realizado com sucesso!");
                setTimeout(() => {
                    setSuccess("");
                }, 5000);
            }

            return { success: true, user: data || data };

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ register, success, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}