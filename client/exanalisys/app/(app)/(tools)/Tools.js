import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { styles } from "./Tool.style";
import { Link } from "expo-router"

export default function Tool(){
    return(
        <View>
            <View style={styles.containerTools}>

                {/* Botão para adicionar gastos */}
                <View style={styles.localBotton}>
                    <Link href="/Add" asChild>
                        <TouchableOpacity
                            style={styles.botton}
                        >
                            <Ionicons name="add-circle" size={50} color="#36C8F6" />
                        </TouchableOpacity>
                    </Link>
                    <Text style={styles.txt}>Add Gastos</Text>
                </View>

                 {/* Botão para ver dashboard */}
                {/* <View style={styles.localBotton}>
                    <TouchableOpacity
                        style={styles.botton}
                    >
                        <Entypo name="area-graph" size={50} color="#199BE2" />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Dados </Text>
                </View> */}

                {/* Botão para Simular gastos */}
                <View style={styles.localBotton}>
                    <Link href="/Simulator" asChild>
                        <TouchableOpacity
                            style={styles.botton}
                        >
                            <MaterialIcons name="request-quote" size={50} color="#199BE2" />
                        </TouchableOpacity>
                    </Link>
                    <Text style={styles.txt}>Simular Gastos</Text>
                </View>


                {/* <View style={styles.localBotton}>
                    <TouchableOpacity
                        style={styles.botton}
                    >
                        <Ionicons name="settings" size={50} color="#8FCAE6" />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Config.</Text>
                </View> */}
            </View>
        </View>
    )
}