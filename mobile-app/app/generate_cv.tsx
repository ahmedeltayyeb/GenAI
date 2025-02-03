import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { Text, ActivityIndicator, View, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';

export default function CVGeneration() {
    const searchParams = useSearchParams();
    const title = searchParams.get("title"); // Correct usage of get() method
    const company = searchParams.get("company");
    const description_job = searchParams.get("description");
    const API_BASE = Constants.expoConfig?.extra?.API_URL;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [latexCV, setLatexCV] = useState('');

    const [userData, setUserData] = useState({
        name: '',
        age: '',
        description: '',
        country: '',
        education: '',
        institution: '',
        degree: '',
        experience: '',
        skills: '',
        languages: ''
    });

    // Fetch user data and then latex generation
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await AsyncStorage.getItem("user_id");
                const response = await fetch(`${API_BASE}/cvinfo/get`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id })
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setUserData({
                        name: data["name"],
                        age: data["age"],
                        description: data["description"],
                        country: data["country"],
                        education: data["education"],
                        institution: data["institution"],
                        degree: data["degree"],
                        experience: data["experience"],
                        skills: data["skills"],
                        languages: data["languages"],
                    });
                } else {
                    console.error("Error retrieving user data for CV generation");
                    router.replace("/error");
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
                router.replace("/error");
            }
        };

        const fetchLatexCV = async () => {
            try {
                const latexResponse = await fetch(`${API_BASE}/cvgen/latex`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        company,
                        description_job: description_job,
                        ...userData // Destructuring userData here
                    })
                });

                if (latexResponse.status === 200) {
                    const data = await latexResponse.json();
                    const latexString = data["latex"];
                    setLatexCV(latexString.replace(/\\n/g, '\n')); // Correctly formatting the latex string
                } else {
                    console.error("Error retrieving the latex CV");
                    router.replace("/error");
                }
            } catch (error) {
                console.error("Failed to fetch latex CV", error);
                router.replace("/error");
            }
        };

        if (userData.name) { // Make sure user data is fetched before fetching latex CV
            fetchLatexCV();
        } else {
            fetchUserData();
        }

    }, [userData, title, company, description_job, API_BASE, router]); // Dependencies: when any of these change, re-run useEffect

    const handleConvertToPDF = () => { 
        // Add PDF conversion logic here
    };

    const handleGenerateNewCV = () => {
        // Add new CV generation logic here
    };

    const RenderCV = () => (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Convert to PDF" onPress={handleConvertToPDF} color="red" />
                <Button title="Generate New CV" onPress={handleGenerateNewCV} color="purple" />
            </View>
            <TextInput
                style={styles.latexInput}
                multiline
                value={latexCV}
                onChangeText={setLatexCV}
                editable={true}
            />
        </View>
    );

    return (
        <View>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "#007BFF", padding: 15, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => router.push("/home")}>
                        <Text style={{ color: "#fff", fontSize: 18 }}>← Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size={100} color="#0000ff" />
                </View>
            ) : (
                <RenderCV />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    latexInput: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        minHeight: 200,
        textAlignVertical: "top",
    },
});