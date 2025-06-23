import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../contexts/authContext";
import { useEffect, useState } from "react";

export default function CardData() {
    const { totalPercent } = useAuth();

    const dicas = [
        "Evite gastar mais do que ganha.",
        "Separe um valor fixo para economias todo mês.",
        "Evite compras por impulso — espere 24h antes.",
        "Faça uma revisão mensal do seu orçamento.",
        "Cuidado com assinaturas automáticas esquecidas.",
        "Evite usar o cartão de crédito como extensão da renda.",
        "Use aplicativos (como este!) para manter o controle diário.",
        "Poupar é mais sobre hábito do que renda."
    ]
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            setIndice((prevIndice) => {
                if (prevIndice + 1 < dicas.length) {
                    return prevIndice + 1;
                }
                else {
                    return 0;
                }
            })  
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    return (
        <View
            style={style.container}
        >
            <Text style={style.title}>Dicas 💡</Text>
            <Text style={style.txt}>
                {
                    <Text>{dicas[indice || 0]}</Text>
                }
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#0F5FA6",
        borderRadius: 10,
        padding: 10,
        gap: 15,
        width: 300,
        margin: 35,
        height: 120,
        alignContent: "center",
        justifyContent: "center"
    },

    txt: {
        width: "100%",
        color: "white",
        fontSize: 18,
        textAlign: "center"
    },

    title: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})