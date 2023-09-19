import { StyleSheet, Text, View } from "react-native";

export default function Page() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tarefas</Text>
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
});
