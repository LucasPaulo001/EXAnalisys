import { StyleSheet } from "react-native";

export const styleModal = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    content: {
        backgroundColor: "rgba(250, 255, 255, 0.86)",
        height: "70%",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        width: "90%",
        padding: 20,
        borderRadius: 20
    },

    input: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 50,
        padding: 15,
        height: 50,
        borderColor: "#9EC8FF"
    }
})