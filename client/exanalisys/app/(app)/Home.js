import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import logo from "../../assets/logo 1.png";
import { styles } from "./Home.style";
import imgCard from "../../assets/cardHero.png";
import imgBackground from "../../assets/backgroundHome.png";
import Tool from "./(tools)/Tools";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/authContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from "./(modal)/Modal";
import { useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import LoadingSpinner from "../../components/menu/Loading";
import CardData from "./(cardData)/CardData";
import { ScrollView } from "react-native";

export default function Home() {

    const { token, loading, usuario, totalPercent } = useAuth();
    const [open, setOpen] = useState(null);

    if (loading) return null;

    if (!token) return <Redirect href="/LoginScreen" />



    return (
        <View>
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

                <ScrollView style={{
                    maxHeight: "80%"
                }}>
                    <View style={styles.containerHome}>
                        <View style={styles.cardTop}>
                            <Image
                                source={logo}
                                style={styles.imgLogo}
                            />
                            <View style={styles.msg}>
                                <View>
                                    <Text style={styles.msgText}>
                                        Olá, {usuario.username}. O que deseja analisar hoje?</Text>
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
                                    <Text style={styles.text}>
                                        Saldo disponível: R$ {
                                            loading ?
                                                (
                                                    <LoadingSpinner />
                                                ) : (
                                                    totalPercent && 
                                                    `${totalPercent} (Após os gastos)`
                                                    || 
                                                    `${usuario.totalBalance} (saldo inicial)`
                                                )}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.bottom}
                                    >
                                        <Text style={{ color: "white" }}>Adicionar Saldo</Text>
                                        <Ionicons
                                            onPress={() => setOpen(true)}
                                            name="add-circle" size={35} color="#36C8F6" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Modal
                            open={open}
                            setOpen={setOpen}
                        />
                        <View>
                            <Tool />
                        </View>

                        <View>
                            <CardData />
                        </View>


                    </View>
                </ScrollView>
                <View style={{
                    position: "absolute",
                    bottom: 80,
                    width: "100%",
                    padding: 15
                }}>
                    <Menu />
                </View>
            </ImageBackground>
        </View>

    )
}