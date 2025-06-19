import React from "react";
import styles from "./Login_Register.styles";
import {
    View,
    Button,
    Text,
    TextInput,
    Image,
    Platform,
    ScrollView,
    KeyboardAvoidingView

} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import icon from "../../assets/iconLoginReg.png";
import { Link } from "expo-router";

//Validações
const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido!").required("O E-mail é obrigatório!"),
    password: yup.string().required("A senha é obrigatória!")
})

export default function LoginScreen() {
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'height' funciona melhor no Android
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // ajustar se houver header
        >

            <ScrollView contentContainerStyle={styles.container}>
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

                <View style={styles.btnAction}>
                    <Button
                        title="Fazer Login"
                        onPress={handleSubmit(onSubmit)}

                    />

                    <Text style={styles.returnLogin}>
                        Não tem uma conta?
                        <Link href="/RegisterScreen">
                            <Text style={styles.link}> faça seu cadastro</Text>
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}