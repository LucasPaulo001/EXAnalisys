import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RegisterScreen } from './screens/login_register/register/RegisterScreen';
import { LoginScreen } from './screens/login_register/login/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
