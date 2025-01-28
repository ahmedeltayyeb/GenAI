import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    };

    checkSession();
  }, []);

  return null;
}