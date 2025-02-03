import { View, Text, StyleSheet } from "react-native";

export default function Error() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Oops... Something went wrong</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 5
    }
})