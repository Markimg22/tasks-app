import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { Input } from "../src/components/Input";

export default function Page() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subTitle}>Entre na sua conta para acessar suas tarefas</Text>
            <Input
                keyboardType="email-address"
                placeholder="E-mail"
            />
            <Input
                secureTextEntry={true}
                placeholder="Senha"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            <Link href={"/register"} style={styles.link}>Criar uma conta</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#1a1a1a',
        padding: 24,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50,
        width: '70%'
    },
    button: {
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#BB86FC',
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'underline',
        color: '#ababab',
        fontSize: 16,
        marginTop: 30,
    }
});
