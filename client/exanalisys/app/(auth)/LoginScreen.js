import React, { useEffect } from "react";
import styles from "./Login_Register.styles";
import {
    View,
    Button,
    Text,
    TextInput,
    Image,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Alert

} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import icon from "../../assets/iconLoginReg.png";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "../../contexts/authContext";

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


    //Pegando funções do contexto
    const { login, toke, error } = useAuth();

    //Caso já tenha token, redireciona para a home
    useEffect(() => {
        if (toke) {
            <Redirect href="/Home"/>
        }
    }, []);



    //Função para submit de login
    const onSubmit = async (data) => {
        const result = await login(data.email, data.password);

        if (result.success) {
            router.replace("/Home");
        }
        else {
            Alert.alert("Erro", "E-mail ou senha inválidos");
        }

        console.log(result.success);
    }

    return (
        // Formulário
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
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