import { View, Text, ImageBackground, StyleSheet, ScrollView } from "react-native";
import background from "../../../assets/backgroundHome.png";
import { Stack } from "expo-router";
import Menu from "../../../components/menu/Menu";
import { useAuth } from "../../../contexts/authContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/menu/Loading";


export default function ListExpenses() {
    const { listExpenses, expenses, token, loading } = useAuth();
    const [totalExpenses, setTotalExpenses] = useState("");

    const { setTotalPercent, usuario } = useAuth();

    useEffect(() => {
        listExpenses();
    }, [token]);

    useEffect(() => {
        if (expenses.length > 0) {
            const total = expenses.reduce((acc, item) => {
                return acc + parseFloat(item.value);
            }, 0);  

            //Calculos de saldo sobre os gastos
            setTotalExpenses(total.toFixed(2));

            const saldo = parseFloat(usuario.totalBalance) - total;
            setTotalPercent(saldo.toFixed(2));
        }

    }, [expenses, token]);

    const formatData = (data) => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    return (

        <View style={styles.container}>
            <ImageBackground
                source={background}
                style={{ height: "100%" }}
            >
                <ScrollView style={{ flex: 1, maxHeight: "75%" }}>
                    <Stack.Screen
                        options={{
                            title: "Listagem de gastos",
                            headerStyle: { backgroundColor: "#63A1F2" },
                            headerTintColor: "#fff",
                        }}
                    />

                    <View style={styles.containerExpenses}>
                        <Text style={{ color: '#092B48', fontSize: 20, fontWeight: "bold" }}>
                            Total de Gastos: R$ {totalExpenses || 0}
                        </Text>
                        {
                            loading ? (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 100
                                }}>
                                    <LoadingSpinner />
                                </View>
                            ) : (
                                expenses.length > 0 ? (
                                    expenses.map((exp, index) => (

                                        <View style={styles.cardExpense} key={index}>
                                            <Text
                                                style={styles.textValue}
                                            >
                                                Valor: R$ {exp.value}
                                            </Text>
                                            <Text
                                                style={styles.text}
                                            >
                                                Descrição: {exp.description}
                                            </Text>
                                            <Text
                                                style={styles.text}
                                            >
                                                Método de pagamento: {exp.paymentMethod}
                                            </Text>
                                            <Text style={styles.textSmall}>
                                                Data: {formatData(exp.date)}
                                            </Text>

                                        </View>

                                    ))
                                ) : (
                                    <Text
                                        style={{fontSize: 20}}
                                    >Sem gastos ainda</Text>
                                )
                            )
                        }
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
            </ImageBackground >
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    text: {
        fontSize: 20,
        color: "white",
        padding: 10
    },
    textValue: {
        fontSize: 20,
        color: "white",
        borderBottomColor: "#FCFFB1",
        borderBottomWidth: 2,
        padding: 10
    },
    textSmall: {
        color: "white"
    },
    cardExpense: {
        backgroundColor: "#2C3A42",
        width: "90%",
        padding: 10,
        borderRadius: 15,
        boxShadow: "5px 10px 5px rgb(69, 85, 99)"
    },
    containerExpenses: {
        gap: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 50,
        marginTop: 50
    }
})