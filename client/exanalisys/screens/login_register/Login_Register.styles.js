import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: "80%",
        fontFamily: "Arial",
        gap: 50,
        padding: 0,
        margin: 0
    },
    localForm: {
        gap: 10
    },  

    localIcon: {
        alignItems: "center"
    },

    icon: {
        height: 200,
        width: 200
    },

    textLR: {
        fontSize: 25,
        color: "#63A1F2",
        fontWeight: "bold"
    },

    error: {
        color: "red"
    },  

    btnsNav: {
        alignItems: "center",
        width: "100%",
        gap: 25
    },

    returnLogin: {
        fontSize: 16
    },

    input: {
        width: "100%",
        backgroundColor: "#F3F3F3",
        borderRadius: 50,
        padding: 15,
        height: 50
    }
})