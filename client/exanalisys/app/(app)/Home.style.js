import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerHome: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    cardTop: {
        backgroundColor: "#0F5FA6",
        padding: 20,
        paddingBottom: 0,
        marginTop: 45,
        width: "95%",
        borderRadius: 30,
        position: "relative"
    },
    imgLogo: {
        height: 60,
        width: 60
    },
    img: {
        height: 110,
        width: 110
    },
    msg: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    },
    msgText: {
        color: "white",
        fontSize: 18,
        width: "90%",
        fontWeight: "bold"
    },
    imgBackground: {
        height: "100%"
    },
    localCardIcon: {
        alignContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    cardIcon: {
        height: 110,
        marginTop: 50,
        backgroundColor: "#2C3A42",
        width: "90%",
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        boxShadow: "15px 5px 3px rgba(44, 58, 66, 0.34)",
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 10,
        borderBottomColor: "#FCFFB1",
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: "column"
    },
    bottom:{
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 10
    }
})