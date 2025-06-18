import React from "react";
import styles from "../Login_Register.styles";
import { View, Button, Text, TextInput, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import icon from "../../../assets/iconLoginReg.png";

//Validações
const schema = yup.object().shape({
    username: yup.string().required("Nome de usuário é obrigatório!"),
    email: yup.string().email("E-mail inválido!").required("O E-mail é obrigatório!"),
    password: yup.string().required("A senha é obrigatória!"),
    repeatPass: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Senhas não conferem')
        .required('Confirmação obrigatória'),
})

export const RegisterScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const onSubmit = (data) => {
        alert("Olá " + data.username)
    }

    return (
        // Formulário
        <View style={styles.container}>
            <View style={styles.localIcon}>
                <Image
                    style={styles.icon}
                    source={icon}
                />

                <Text style={styles.textLR}>Analisar hoje.</Text>
                <Text style={styles.textLR}>Prosperar amanhã.</Text>
            </View>
            <View style={styles.localForm}>
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Nome de usuário"
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="default"
                        />
                    )}
                />
                {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

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

                <Controller
                    control={control}
                    name="repeatPass"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Repita a senha..."
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.repeatPass && <Text style={styles.error}>{errors.repeatPass.message}</Text>}
            </View>

            <View style={styles.btnsNav}>
                <Button
                    title="Fazer Cadastro"
                    onPress={handleSubmit(onSubmit)}
                />

                <Text style={styles.returnLogin}>Já tem uma conta? faça login</Text>
            </View>
        </View>
    )
}