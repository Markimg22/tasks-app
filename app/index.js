import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link, router } from 'expo-router';
import { Input } from "../src/components/Input";
import { useState } from "react";
import { api } from '../src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const disabledButton = email === '' || password === '';

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await api.post('/login', {
                email,
                password
            });
            await AsyncStorage.setItem(
                '@tasks-app/token',
                result.data.accessToken
            );
            router.replace('/tasks');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subTitle}>Entre na sua conta para acessar suas tarefas</Text>
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholder="E-mail"
            />
            <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Senha"
            />
            <TouchableOpacity
                style={[styles.button, {
                    backgroundColor: disabledButton || loading ? '#ababab' : '#BB86FC'
                }]}
                onPress={handleLogin}
                disabled={disabledButton || loading}
            >
                {loading ? (
                    <ActivityIndicator size={30} />
                ) : (
                    <Text style={styles.textButton}>Entrar</Text>
                )}
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
