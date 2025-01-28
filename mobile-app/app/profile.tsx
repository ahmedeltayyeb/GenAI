import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileForm from './components/ProfileForm';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = async (profileData: any) => {
    setLoading(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const profileKey = keys.find(key => key.startsWith('profile-'));
      const email = profileKey ? profileKey.replace('profile-', '') : null;

      if (!email) {
        Alert.alert('Error', 'No email found. Please sign up again.');
        setLoading(false);
        return;
      }
      await AsyncStorage.setItem(`profile-${email}`, 'true');
      router.replace('/home');
    } catch (error) {
      console.error("Error completing profile:", error);
      Alert.alert('Error', 'An error occurred completing your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileForm onSubmit={handleProfileSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});