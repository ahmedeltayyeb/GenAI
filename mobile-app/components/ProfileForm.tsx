import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CountryPicker } from 'react-native-country-codes-picker';

interface ProfileFormProps {
  onSubmit: (profileData: any) => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState<string>('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [education, setEducation] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [languages, setLanguages] = useState<string>('');
  const [jobCategories, setJobCategories] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({ name, age, description, country, education, institution, degree, experience, skills, languages, jobCategories });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <TextInput placeholder="Full Name" style={styles.input} onChangeText={(text) => setName(text)} />
        <TextInput placeholder="Short Description" style={[styles.input, styles.multilineInput]} multiline onChangeText={(text) => setDescription(text)} />

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

        <Modal visible={showCountryPicker} transparent animationType="slide">
          <CountryPicker
            show={showCountryPicker}
            lang='en'
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setCountry(item.name.en); // Set the country name
              setShowCountryPicker(false);
            }}
            style={{ modal: { height: 400 } }}
          />
        </Modal>

        <Picker selectedValue={education} style={[styles.input, styles.inputPicker]} onValueChange={setEducation}>
          <Picker.Item label="Select Education Level" value="" />
          <Picker.Item label="Bachelors" value="Bachelors" />
          <Picker.Item label="Masters" value="Masters" />
          <Picker.Item label="PhD" value="PhD" />
        </Picker>

        <TextInput placeholder="Institution" style={styles.input} onChangeText={setInstitution} />
        <TextInput placeholder="Degree" style={styles.input} onChangeText={setDegree} />
        <TextInput placeholder="Experience" style={[styles.input, styles.multilineInput]} multiline onChangeText={setExperience} />
        <TextInput placeholder="Skill Keywords" style={[styles.input, styles.inputPicker]} multiline onChangeText={setSkills} />
        <TextInput placeholder="Languages" style={styles.input} onChangeText={setLanguages} />
        <TextInput placeholder="Job Categories" style={styles.input} multiline onChangeText={setJobCategories} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Complete Profile" onPress={handleSubmit} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputPicker: {
    height: 50
  }
});

export default ProfileForm;