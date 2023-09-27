import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from "../src/components/Task";
import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import { api } from '../src/api/api';

/** Tela de Tarefas */
export default function Page() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const disabledButton = title === '';

    /** UseEffect:
     *  é um hook do React Native que usamos para controlar o ciclo de vida de um componente,
     *  nesse caso quando o componente é carregado ele chama a função handleGetTasks()
     */
    useEffect(() => {
        handleGetTasks();
    }, []);

    /** Função para deslogar
     *  Remove o token da memória do aparelho e redireciona para a tela de Login
     */
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@tasks-app/token');
            router.replace('/');
        } catch (error) {
            console.error(error);
        }
    }

    /** Função buscar Tarefas
     *  Pega o token armazenado no aparelho, chama a API com método GET na rota /tasks passando o token,
     *  essa chamada da API retorna as tarefas cadastradas para o usuário logado e seta no estado tasks
     */
    const handleGetTasks = async () => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('@tasks-app/token');
            const result = await api.get('/tasks', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTasks(result.data);
        } catch (error) {
            Alert.alert('Houve um erro', error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    /** Função criar Tarefa
     *  Pega o token armazenado no aparelho, chama a API com método POST na rota /task passando o token,
     *  após criar a nova tarefa chama o método handleGetTasks para buscar as tarefas novamente.
     */
    const handleCreateTask = async () => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('@tasks-app/token');
            await api.post('/task', { title }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            await handleGetTasks();
            setTitle('');
        } catch (error) {
            Alert.alert('Houve um erro', error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    /** TODO: Função de deletar Tarefa
     *  para chamar a API de deletar: método DELETE, rota /task/${id}
     *  lembre de passar o token assim como nos métodos anteriores
     */
    const handleDeleteTask = async (id) => {
    }

    /** TODO: Função de check Tarefa
     *  para chamar a API de check: método PATCH, rota /task/${id}, body { finished }
     *  lembre de passar o token assim como nos métodos anteriores
     */
    const handleCheckTask = async (id, finished) => {
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: '10%' }} />
                <Text style={styles.title}>Tarefas</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.textLogout}>Sair</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                style={styles.list}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) =>
                    <Task
                        task={item}
                        onDeleteTask={async () => await handleDeleteTask(item.id)}
                        onCheckTask={async () => await handleCheckTask(item.id, !item.finished)}
                    />
                }
            />
            <View style={styles.form}>
                <View style={styles.line} />
                <Input
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    placeholder="Insira uma nova tarefa"
                />
                <Button
                    loading={loading}
                    onPress={handleCreateTask}
                    title="Adicionar"
                    disabled={disabledButton}
                />
            </View>
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
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30,
    },
    textLogout: {
        color: '#ababab',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    list: {
        width: '100%',
    },
    line: {
        backgroundColor: '#fff',
        height: 2,
        width: '100%',
        marginBottom: 10,
    },
    form: {
        width: '100%',
        alignItems: 'center'
    },
});
