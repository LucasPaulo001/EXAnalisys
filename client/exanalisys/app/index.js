import { View, Text, StyleSheet, Button, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router"
import img from "../assets/background.png"
import logo from "../assets/logo.png"
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

export default function Home() {

    return (
        <>
            <ImageBackground
                source={img}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text style={styles.txtWelcome}>Bem Vindo(a)!</Text>

                    <View>
                        <Image
                            style={styles.imgLogo}
                            source={logo}
                        />
                    </View>

                    <Text style={styles.txtDescription}>
                        Com o EXAnalisys você terá total controle e organização de seus gastos de forma
                        simples
                        e organizada!
                    </Text>

                    <View style={styles.contentInit}>
                        <Text style={styles.txt}>Se conecte e começe a se organizar!</Text>
                        <Link
                            href="/LoginScreen" asChild>
                            <TouchableOpacity
                                style={styles.btnGo}
                            >
                                <Text style={styles.btnText}>Vamos lá</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <Link href="/Home">
                        <Text style={styles.by}>
                            By Lucas Paulo
                        </Text>
                    </Link>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 25,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    txtWelcome: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#63A1F2"
    },

    txt: {
        fontSize: 18,
        color: "#0F5FA6",
        fontWeight: "bold"
    },

    contentInit: {
        gap: 25
    },

    txtDescription: {
        backgroundColor: "#2D77D7",
        padding: 25,
        margin: 15,
        fontSize: 18,
        boxShadow: "5px 10px 15px #062D60",
        color: "white",
        fontWeight: "bold",
        borderRadius: 25
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnGo: {
        backgroundColor: "#63A1F2",
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 30,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    imgLogo: {
        height: 150,
        width: 150
    },

    by: {
        fontSize: 18,
        textAlign: "center",
        color: "#092B48",
        fontWeight: "bold",
        backgroundColor: "#CEE8FF",
        borderRadius: 15,
        bottom: 65,
        padding: 20,
        opacity: .6,
        position: "absolute"
    }
})

