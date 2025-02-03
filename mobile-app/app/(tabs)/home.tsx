import SearchBar from "@/components/SearchBar";
import { View, Text, StyleSheet, Modal, ActivityIndicator, TouchableOpacity, Linking, FlatList } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";
import Constants from 'expo-constants';

export default function Home() {
    const [searchVisible, setSearchVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<any[]>([]);
    const router = useRouter();
    const API_BASE = Constants.expoConfig?.extra?.API_URL;

    const searchSubmit = (search: string, location: string) => {
        const fetchJobs = async () => {
            setLoading(true)
            try {
                const response = await fetch(API_BASE + "/scrape/job", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ search: search, location: location })
                });

                
                if (response.status == 200) {
                    const data = await response.json();
                    console.log(data);
                    setJobs(Object.values(data));
                }
                else {
                    router.replace("/error");
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }

    const generateCV = ({title, company, description}: {title: string, company: string, description: string}) => {
        router.replace({
            "pathname": "/generate_cv",
            params: {title: title, company: company, description: description}
        })
    }

    const JobItem = ({ job }: { job: any }) => {
        return (
            <View style={styles.item}>

                <TouchableOpacity onPress={() => Linking.openURL(job.url)}>
                    <Text style={styles.title_item}>{job.title}</Text>
                </TouchableOpacity>

                <Text style={styles.company}>{job.company}</Text>

                <Text style={styles.type}>{job.full_part}</Text>

                <TouchableOpacity style={styles.button} onPress={() => generateCV({title: job.title, company: job.company, description: job.description})}>
                    <Text style={styles.buttonText}>Generate CV</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>  
        {loading ? (
            <View style={styles.loading}>
                <ActivityIndicator size={100} color="#0000ff" />
            </View>
        ) : (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={jobs}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    renderItem={({ item }) => <JobItem job={item} />}
                    contentContainerStyle={styles.container_grid}
                />
            </View>
        )}

        <Modal visible={searchVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Your next job opportunity awaits</Text>
                <View style={styles.searchBarContainer}>
                    <SearchBar searchSubmit={searchSubmit} setSearchVisible={setSearchVisible} />
                </View>
            </View>
        </Modal>
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
    container_grid: {
        padding: 10,
        flexGrow: 1, 
        paddingBottom: 50
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
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    title_item: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#007bff",
        marginBottom: 5,
    },
    item: {
        flex: 1,
        margin: 10,
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    company: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 5,
    },
    type: {
        fontSize: 14,
        color: "#444",
        textAlign: "center",
        marginBottom: 10,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});