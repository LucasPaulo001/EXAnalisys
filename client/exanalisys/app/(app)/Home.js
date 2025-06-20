import { View, Text, Image, ImageBackground } from "react-native";
import logo from "../../assets/logo 1.png";
import { styles } from "./Home.style";
import imgCard from "../../assets/cardHero.png";
import imgBackground from "../../assets/backgroundHome.png";
import Tool from "./(tools)/Tools";
import { Stack } from "expo-router";

export default function Home() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "EXAnalisys",
                    headerStyle: { backgroundColor: "#63A1F2" },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                }}
            />
            <ImageBackground
                style={styles.imgBackground}
                source={imgBackground}
            >
                <View style={styles.containerHome}>
                    <View style={styles.cardTop}>
                        <Image
                            source={logo}
                            style={styles.imgLogo}
                        />
                        <View style={styles.msg}>
                            <View>
                                <Text style={styles.msgText}>
                                    Olá, Lucas. O que deseja analisar hoje?</Text>
                            </View>
                            <View>
                                <Image
                                    style={styles.img}
                                    source={imgCard}
                                />
                            </View>
                        </View>
                        <View style={styles.localCardIcon}>
                            <View style={styles.cardIcon}>
                                <Text style={styles.text}>Saldo disponível: R$ 2.100,00</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Tool />
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}