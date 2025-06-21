import { View, Text, ImageBackground } from "react-native";
import background from "../../../assets/backgroundHome.png";
import { Stack } from "expo-router";


export default function ListExpenses() {
    return (
        <View>

            <ImageBackground
                source={background}
                style={{ height: "100%" }}
            >
                <Stack.Screen
                    options={{
                        title: "Listagem de gastos",
                        headerStyle: { backgroundColor: "#63A1F2" },
                        headerTintColor: "#fff",
                    }}
                />

                <View>
                    <Text>Olá</Text>
                </View>

            </ImageBackground>

        </View>
    )
}