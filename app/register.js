import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { router } from 'expo-router';
import { Input } from "../src/components/Input";

export default function Page() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie uma conta</Text>
            <Input
                placeholder="Nome"
            />
            <Input
                keyboardType="email-address"
                placeholder="E-mail"
            />
            <Input
                secureTextEntry={true}
                placeholder="Senha"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Criar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Já tenho uma conta</Text>
            </TouchableOpacity>
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
        marginBottom: 30,
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
