import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styleModal } from "./Modal.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "../../../contexts/authContext";

const schema = yup.object({
    totalBalance: yup.number()
        .typeError('Insira um número válido')
        .positive('O valor deve ser positivo')
        .required('Campo obrigatório')
})

export default function Modal({ open, setOpen }) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(schema) });

    const { addBalance } = useAuth();

    const onSubmit = (data) => {
        const atualization = addBalance(data.totalBalance);

        if (atualization) {
            alert("Saldo adicionado com sucesso!");
            reset();
            setOpen(false);
        }

    }

    return (
        <>
            {
                open && (
                    <View style={styleModal.container}>
                        <View style={styleModal.content}>
                            <AntDesign
                                onPress={() => setOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    color: "red"
                                }} name="closecircleo" size={30} color="black" />
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold"
                            }}>Insira o seu saldo, a partir dele poderemos ter as métricas necessárias!
                            </Text>
                            {errors.totalBalance && <Text style={{
                                color: "red", 
                                fontWeight: "bold"
                            }}>{errors.totalBalance.message}</Text>}
                            <Controller
                                name="totalBalance"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styleModal.input}
                                        placeholder="Ex: 50.00"
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ? String(value) : ""}
                                    />

                                )}
                            />
                            
                            <Button
                                title="Adicionar"
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                    </View>
                )
            }
        </>
    )
}