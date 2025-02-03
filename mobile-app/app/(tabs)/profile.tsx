import { Text, Button, ScrollView, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';

export default function Profile() {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [education, setEducation] = useState<string>('');
    const [institution, setInstitution] = useState<string>('');
    const [degree, setDegree] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [languages, setLanguages] = useState<string>('');
    const router = useRouter();
    const API_BASE = Constants.expoConfig?.extra?.API_URL;

    useEffect(() => {
        const fetchData = async () => {
            const user_id = await AsyncStorage.getItem("user_id");
            const response = await fetch(API_BASE + "/cvinfo/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: user_id })
            });
    
            if (response.status == 200) {
                const data = await response.json()
                setName(data["name"]);
                setAge(data["age"]);
                setDescription(data["description"]);
                setCountry(data["country"]);
                setEducation(data["education"]);
                setInstitution(data["institution"]);
                setDegree(data["degree"]);
                setExperience(data["experience"]);
                setSkills(data["skills"]);
                setLanguages(data["languages"]);
            }
            else {
                console.log("Error retrieveng user data for CV generation");
                router.replace("/error");
            }
        }

        fetchData();
    }, [])

    return (
        <View>
            <Button title="Logout" onPress={async () => {
                await AsyncStorage.removeItem("user_id");
                router.replace("/");
            }}></Button>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name || 'Your Name'}</Text>
                    {age && <Text style={styles.age}>{age} years old</Text>}
                    {country && <Text style={styles.country}>{country}</Text>}
                </View>

                {description && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Me</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                )}

                {(education || institution || degree) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {institution && <Text style={styles.institution}>{institution}</Text>}
                        <View style={styles.row}>
                            {degree && <Text style={styles.degree}>{degree}</Text>}
                            {education && <Text style={styles.educationType}>{education}</Text>}
                        </View>
                    </View>
                )}

                {experience && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        <Text style={styles.experienceText}>{experience}</Text>
                    </View>
                )}

                {skills && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.chipsContainer}>
                            {skills.split(',').map((skill, index) => (
                                <View key={index} style={styles.chip}>
                                    <Text style={styles.chipText}>{skill.trim()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {languages && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        <View style={styles.chipsContainer}>
                            {languages.split(',').map((lang, index) => (
                                <View key={index} style={styles.chip}>
                                    <Text style={styles.chipText}>{lang.trim()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    header: {
        alignItems: 'center',
        marginBottom: 24
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    age: {
        fontSize: 16,
        color: '#666',
        marginTop: 4
    },
    country: {
        fontSize: 14,
        color: '#888',
        marginTop: 2
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12
    },
    institution: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333'
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4
    },
    degree: {
        fontSize: 14,
        color: '#666'
    },
    educationType: {
        fontSize: 14,
        color: '#666'
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#444'
    },
    experienceText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#444'
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    chip: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    chipText: {
        fontSize: 12,
        color: '#333'
    }
});