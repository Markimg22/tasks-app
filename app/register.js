import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { router } from 'expo-router';
import { Input } from "../src/components/Input";
import { api } from '../src/api/api';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const disabledButton =
        name === '' ||
        email == '' ||
        password === '';

    const handleRegister = async () => {
        try {
            setLoading(true);
            const result = await api.post('/register', {
                name,
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
            <Text style={styles.title}>Crie uma conta</Text>
            <Input
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Nome"
            />
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
                    backgroundColor: disabledButton || loading ? '#ababab' : '#BB86FC',
                }]}
                onPress={handleRegister}
                disabled={disabledButton || loading}
            >
                {loading ? (
                    <ActivityIndicator size={30} />
                ) : (
                    <Text style={styles.textButton}>Criar conta</Text>
                )}
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
