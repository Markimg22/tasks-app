import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@tasks-app/token');
            router.replace('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: '10%' }} />
                <Text style={styles.title}>Tarefas</Text>
                <TouchableOpacity
                    onPress={handleLogout}
                >
                    <Text style={styles.textLogout}>Sair</Text>
                </TouchableOpacity>
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
    }
});
