import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState({});

    //Função para registro
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

            if (res.ok) {
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

    //Função para o login
    const login = async (email, password) => {
        const loginAPI = 'https://exanalisys.onrender.com/api/users/login';

        try {

            const res = await fetch(loginAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            if (!res.ok) {
                setError(data.errors || data.message);
                return { success: false };
            }

            await AsyncStorage.setItem("token", data.token);
            setToken(data.token);

            return { success: true };
        }
        catch (err) {
            console.log(err);
        }
    }

    const getUser = async () => {
        const getUserAPI = 'https://exanalisys.onrender.com/api/users/profile';

        try {

            const res = await fetch(getUserAPI, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            })

            const data = await res.json();

            if (res.ok) {
                setUsuario(data);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    //Função para edição de dados do usuário
    const addBalance = async (totalBalance) => {
        const editUserAPI = 'https://exanalisys.onrender.com/api/users/edit-user';

        try{

            const res = await fetch(editUserAPI, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ totalBalance })
            })

            const data = await res.json();

            if(!res.ok){
                setError("Erro ao adicionar saldo!")
            }

            console.log(data)

            await getUser();

            return true;

        }
        catch(err){
            console.log(err)
        }
    }


    //Função para o logout
    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setToken(null);
    };

    //Função para recarregar dados do AsyncStorage
    const loadUserFromStorage = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setToken(token);
        }
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            await loadUserFromStorage();
        };
        init();
    })

    useEffect(() => {
        if(token){
            getUser();
        }
    }, [token]);


    return (
        <AuthContext.Provider value={{
            register,
            success,
            error,
            login,
            logout,
            loading,
            token,
            usuario,
            addBalance
        }}>

            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}