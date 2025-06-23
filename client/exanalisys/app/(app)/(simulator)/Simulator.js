import { Text, View, ImageBackground, TextInput, Button, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import background from "../../../assets/backgroundHome.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../(add)/Add.style";
import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";

const schema = yup.object({
    value: yup
        .number("Informe um valor válido!")
        .required("O campo 'Valor' é obrigatório!"),

    category: yup
        .string("Informe uma categoria válida!")
        .optional(),

    paymentMethod: yup
        .string()
        .optional()
});

export default function Simulator() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const [valueSimulate, setValueSimulate] = useState("");
    const [porcent, setPorcent] = useState("")

    const { usuario } = useAuth();

    let totalBalance = usuario.totalBalance

    //Função para calcular a simulação
    const simulate = (value) => {
        const valor = parseFloat(value);
        const saldo = parseFloat(totalBalance || 0);
        setValueSimulate((saldo - valor).toFixed(2));
        setPorcent(((value / saldo) * 100).toFixed(2));
        reset();
    }

    const onSubmit = (data) => {
        simulate(data.value)
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Simulação de gastos",
                    headerStyle: { backgroundColor: "#63A1F2" },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    animation: "simple_push"
                }}
            />
            <ImageBackground
                source={background}
                style={{ height: "100%" }}
            >
                {/* Formulário */}
                <View style={styles.containerAdd}>

                    <View
                        style={{
                            width: "100%",
                            gap: 20,
                            padding: 25,
                            height: "100%",

                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                                backgroundColor: "#63A1F2",
                                padding: 10,
                                borderRadius: 10
                            }}
                        >
                            Aqui você pode simular seus gastos
                        </Text>
                        <Controller
                            name="value"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Informe o valor: 50.00"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                        {
                            errors.value &&
                            <Text style={{ color: "red", fontWeight: "bold" }}>
                                {errors.value.message}
                            </Text>
                        }
                        <Controller
                            control={control}
                            name="category"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Categoria: compras, energia... (opcional)"
                                    onChangeText={onChange}
                                    keyboardType="default"
                                    value={value}
                                />
                            )}
                        />
                        {
                            errors.category &&
                            <Text style={{ color: "red", fontWeight: "bold" }}>
                                {errors.category.message}
                            </Text>
                        }
                        <Controller
                            control={control}
                            name="paymentMethod"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Método de pagamento: Pix, cartão... (opcional)"
                                    onChangeText={onChange}
                                    keyboardType="default"
                                    value={value}
                                />
                            )}
                        />
                        {
                            errors.paymentMethod &&
                            <Text style={{ color: "red", fontWeight: "bold" }}>
                                {errors.paymentMethod.message}
                            </Text>
                        }

                        <Button
                            title="Simular"
                            onPress={handleSubmit(onSubmit)}
                        />

                        <View>
                            {
                                valueSimulate && (
                                    <View
                                        style={{
                                            backgroundColor: "#2C3A42",
                                            padding: 15,
                                            borderRadius: 10,
                                            gap: 25
                                        }}
                                    >
                                        <View>
                                            <Text style={styleSimulate.textDestaq}>
                                                Valor de seu saldo após a compra
                                            </Text>
                                            <Text style={styleSimulate.text}>
                                                {valueSimulate < 0 ? (
                                                    "R$ " + valueSimulate + " 🤯"
                                                ) : (
                                                    "R$ " + valueSimulate
                                                )}
                                            </Text>
                                        </View>

                                        <Text style={styleSimulate.text}>
                                            Esse gasto representa {porcent}% do seu saldo atual.
                                        </Text>
                                    </View>
                                )
                            }

                        </View>
                    </View>

                </View>

            </ImageBackground>


        </View>
    )
}

const styleSimulate = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 18
    },

    textDestaq: {
        color: "white",
        fontWeight: "bold",
        fontSize: 19
    }
})