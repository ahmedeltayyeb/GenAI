import SearchBar from "@/components/SearchBar";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();
    
    const searchSubmit = () => {
        router.replace("/job-results")
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your next job opportunity awaits</Text>
            <View style={styles.searchBarContainer}>
                <SearchBar searchSubmit={searchSubmit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 5,  // for Android shadow
    },
    searchBarContainer: {
        marginTop: 30,  // Gives space between the title and search bar
    }
});