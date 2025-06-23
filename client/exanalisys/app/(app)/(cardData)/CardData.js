import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../contexts/authContext";

export default function CardData(){
    const { totalPercent } = useAuth();

    return(
        <View
            style={style.container}
        >
            <Text style={style.title}>Dicas 💡</Text>
            <Text style={style.txt}>Evite gastar mais do que ganha.</Text>
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