import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";

export default function Menu(){
    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                
                <Link href="/ListExpenses" asChild>
                    <TouchableOpacity>
                        <FontAwesome name="money" size={30} color="white" />
                    </TouchableOpacity>
                </Link>
                
                <TouchableOpacity>
                    <AntDesign name="user" size={30} color="white" />
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },

    menu: {
        backgroundColor: "#092B48",
        width: "100%",
        padding: 20,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

