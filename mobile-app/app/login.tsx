import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Button } from 'react-native'
import { useRouter } from "expo-router";
import Constants from "expo-constants";

export default function Login() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const API_BASE = Constants.expoConfig?.extra?.API_URL;
    const router = useRouter();

    const onAuth = (email: string, password: string) => {
        const checkLogIn = async () => {
            try{
                const response = await fetch(API_BASE+'/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username: email, password: password})
                });

                if (response.status == 200)
                {
                    const data = await response.json();
                    await AsyncStorage.setItem('user_id', data.user_id);
                    router.replace("/(tabs)/home");
                }
                
            }
            finally{
                setLoading(false);
            }
        }

        const checkSignUp = async () => {
            try{
                const response = await fetch(API_BASE+'/auth/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username: email, password: password})
                });

                if (response.status == 200)
                {
                    const data = await response.json();
                    await AsyncStorage.setItem("user_id", data.user_id)
                    router.replace("/profile-init");
                }
            }
            finally{
                setLoading(false);
            }
        }

        setLoading(true);
        if (isLogin)
            checkLogIn();
        else checkSignUp();
    }

    return (
        <View style={styles.container}>
            <AuthForm isLogin={isLogin} onAuth={onAuth} loading={loading}/>
            <Button title={isLogin ? "I DON'T HAVE AN ACCOUNT" : "I ALREADY HAVE AN ACCOUNT"} onPress={() => setIsLogin(!isLogin)}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})