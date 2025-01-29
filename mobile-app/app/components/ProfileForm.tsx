import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CountryPicker } from 'react-native-country-codes-picker';

interface ProfileFormProps {
  onSubmit: (profileData: any) => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [jobCategories, setJobCategories] = useState('');

  const handleSubmit = () => {
    onSubmit({ name, age, description, /* ... other profile fields */ });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      
      <TextInput placeholder="Full Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Short Description" style={styles.input} multiline onChangeText={setDescription} />
      
      <View style={styles.rowContainer}>
        <TextInput placeholder="Age" style={[styles.input, styles.halfInput]} keyboardType="numeric" onChangeText={setAge} />

        <TouchableOpacity
          onPress={() => setShowCountryPicker(true)}
          style={[styles.input, styles.halfInput, styles.countryPicker]}
        >
          <Text style={{ color: countryCode ? 'black' : 'gray', fontSize: 16 }}>
            {country || 'Select Country'}
          </Text>
        </TouchableOpacity>
      </View>

      <CountryPicker
        show={showCountryPicker}
        lang='en'
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setCountry(item.name.en); // Set the country name
          setShowCountryPicker(false);
        }}
      />

      <Picker selectedValue={education} style={styles.input} onValueChange={setEducation}>
        <Picker.Item label="Select Education Level" value="" />
        <Picker.Item label="Bachelors" value="Bachelors" />
        <Picker.Item label="Masters" value="Masters" />
        <Picker.Item label="PhD" value="PhD" />
      </Picker>
      
      <TextInput placeholder="Institution" style={styles.input} onChangeText={setInstitution} />
      <TextInput placeholder="Experience" style={styles.input} multiline onChangeText={setExperience} />
      <TextInput placeholder="Skill Keywords" style={styles.input} onChangeText={setSkills} />
      <TextInput placeholder="Languages" style={styles.input} onChangeText={setLanguages} />
      <TextInput placeholder="Job Categories" style={styles.input} onChangeText={setJobCategories} />
      
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
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
  },
  halfInput: {
    width: '48%',
  },
  countryPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ProfileForm;