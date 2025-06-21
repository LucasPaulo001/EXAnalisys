import { Text, View, ImageBackground, TextInput, Button, Platform } from "react-native";
import { Stack } from "expo-router";
import background from "../../../assets/backgroundHome.png";
import { styles } from "./Add.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../../contexts/authContext";
import { Alert } from "react-native";

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
        reset,
    } = useForm({ resolver: yupResolver(schema) });
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const { addExpenses } = useAuth();

    const onChange = (event, selectedDate) => {
        selectedDate(Platform.OS === "ios");
        if (selectedDate) {
            setDate(selectedDate);
        }
    }


    //Submit de dados
    const onSubmit = (data) => {
        addExpenses(
            data.value,
            data.category,
            data.description,
            data.paymentMethod,
            data.date
        );
        Alert.alert(
            "Sucesso!",
            "Gasto salvo com sucesso."
        );
        reset();
    }


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

                            {/* Valor do gasto */}
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

                            {/* Categoria do gasto */}
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

                            {/* Descrição */}
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

                            {/* Método de pagamento */}
                            <Controller
                                control={control}
                                name="paymentMethod"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Método de pagamento: Pix, cartão..."
                                        onChangeText={onChange}
                                        keyboardType="default"
                                        value={value}
                                    />
                                )}
                            />

                            {/* Data do gasto */}
                            <Controller
                                control={control}
                                name="date"
                                defaultValue={new Date()}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Button
                                            title="Selecionar data do gasto"
                                            onPress={() => setShowPicker(true)}
                                        />
                                        {
                                            showPicker && (
                                                <DateTimePicker
                                                    value={value}
                                                    mode="date"
                                                    display="default"
                                                    onChange={(event, selectedDate) => {
                                                        setShowPicker(Platform.OS === "ios");
                                                        if (selectedDate) onChange(selectedDate);
                                                    }}
                                                />
                                            )
                                        }
                                    </>
                                )}
                            />


                            <Button
                                title="Salvar gasto"
                                onPress={handleSubmit(onSubmit)}
                            />

                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}