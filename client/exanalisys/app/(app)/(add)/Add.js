import { Text, View, ImageBackground, TextInput } from "react-native";
import { Stack } from "expo-router";
import background from "../../../assets/backgroundHome.png";
import { styles } from "./Add.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

//Validação dos campos
const schema = yup.object({
    //Valor do gasto
    value: yup
        .number("valor inválido!")
        .required("O valor é obrigatório!"),

    category: yup
        .string()
        .required("Categoria é obrigatória!"),

    description: yup
        .string().
        optional(),

    date: yup
        .date().
        typeError("Data inválida").
        required("A data do gasto é obrigatória")
})

export default function Add() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    return (
        <>
            <ImageBackground
                source={background}
                style={{ height: "100%" }}
            >
                <Stack.Screen
                    options={{
                        title: "Adicionar gastos",
                        headerStyle: { backgroundColor: "#63A1F2" },
                        headerTintColor: "#fff",
                    }}
                />
                <View style={styles.containerAdd}>
                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "flex-start",
                        paddingTop: 20,
                        gap: 50
                    }}>
                        <Text style={styles.text}>
                            Aqui você pode cadastrar seus gastos
                        </Text>

                        {/* Formulário */}
                        <View style={{
                            width: "80%",
                            gap: 25
                        }}>
                            <Controller
                                control={control}
                                name="value"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Valor: R$"
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        value={value}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Categoria: compras, energia..."
                                        onChangeText={onChange}
                                        keyboardType="default"
                                        value={value}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Descrição"
                                        onChangeText={onChange}
                                        multiline
                                        numberOfLines={6}
                                        value={value}
                                        style={{
                                            borderWidth: 2,
                                            borderColor: "#0F5FA6",
                                            borderRadius: 5,
                                            padding: 10,
                                            textAlignVertical: "top",
                                            backgroundColor: "white",
                                            minHeight: 100,
                                            marginBottom: 10,
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Categoria: compras, energia..."
                                        onChangeText={onChange}
                                        keyboardType=""
                                        value={value}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Categoria: compras, energia..."
                                        onChangeText={onChange}
                                        keyboardType="default"
                                        value={value}
                                    />
                                )}
                            />

                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}