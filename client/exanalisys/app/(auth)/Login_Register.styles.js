import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: "100%",
        fontFamily: "Arial",
        gap: 20,
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 50,
        paddingBottom: 50,
        justifyContent: "flex-start",
    },
    localForm: {
        gap: 10
    },  

    success: {
        color: "green",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },

    localIcon: {
        alignItems: "center",

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
        color: "red",
        textAlign: "center",
        fontWeight: "bold"
    },  

    returnLogin: {
        fontSize: 16
    },

    input: {
        width: "100%",
        backgroundColor: "#E4E4E4",
        borderRadius: 50,
        padding: 15,
        height: 50
    },

    btnAction: {
        gap: 25
    },

    link: {
        fontWeight: "bold",
        color: "#2661AF",
    }
})