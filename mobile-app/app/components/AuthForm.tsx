import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';

interface AuthFormProps {
  isLogin: boolean;
  onAuth: (email: string, password: string) => void;
  loading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onAuth, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePress = () => {
    onAuth(email, password);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={[styles.input,
          { borderBottomColor: isEmailFocused ? "#6200EE" : "#888"}
        ]}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
        textAlignVertical="center"
      />
      <TextInput
        style={[styles.input,
          { borderBottomColor: isPasswordFocused ? "#6200EE" : "#888"}
        ]}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        textAlignVertical="center"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handlePress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 300,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#888',
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AuthForm;