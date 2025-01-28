import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';

interface ProfileFormProps {
  onSubmit: (profileData: any) => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  // ... other profile fields

  const handleSubmit = () => {
    onSubmit({ name, age, description, /* ... other profile fields */ });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Age" style={styles.input} keyboardType="numeric" onChangeText={setAge} />
      <TextInput placeholder="Short Description" style={styles.input} multiline onChangeText={setDescription} />
      {/* ... other input fields for profile information */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Complete Profile" onPress={handleSubmit} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileForm;