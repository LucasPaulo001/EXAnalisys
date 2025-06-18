import React from "react";
import styles from "../Login_Register.styles";
import { View, Button, Text, TextInput, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import icon from "../../../assets/iconLoginReg.png";

//Validações
const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido!").required("O E-mail é obrigatório!"),
    password: yup.string().required("A senha é obrigatória!")
})

export const LoginScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const onSubmit = (data) => {
        alert("Olá " + data.email)
    }

    return (
        // Formulário
        <View style={styles.container}>
            <View style={styles.localIcon}>
                <Image
                    style={styles.icon}
                    source={icon}
                />

                <Text style={styles.textLR}>Acompanhe.</Text>            
                <Text style={styles.textLR}>Analise.</Text>
                <Text style={styles.textLR}>Evolua.</Text>
                
            </View>
            <View style={styles.localForm}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="E-mail"
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Senha"
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>

            <View>
                <Button
                    title="Fazer Login"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    )
}