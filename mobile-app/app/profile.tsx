import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileForm from './components/ProfileForm';
import Constants from 'expo-constants';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const API_BASE = Constants.expoConfig?.extra?.API_URL;
  const handleProfileSubmit = ({name, age, description, country, education, institution, experience, skills, languages, jobCategories}: {name:string, age:string, description:string, country:string, education:string, institution:string, experience:string, skills:string, languages:string, jobCategories:string}) => {
    const dataSubmit = async () => {
      try{
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await fetch(API_BASE+'/cvinfo/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({user_id: user_id, name: name, age: age, description: description, country: country, education: education, experience: experience, skills: skills, languages: languages, categories: jobCategories})
        })

        if (response.status == 200)
        {
          router.replace("/home");
        }
        
      } finally{
        setLoading(false);
      }
    }
    dataSubmit();
  }

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