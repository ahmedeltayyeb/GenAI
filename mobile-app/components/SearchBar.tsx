import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchBar({searchSubmit, setSearchVisible}: {searchSubmit: (search: string, location: string) => void, setSearchVisible: (val: boolean) => void}) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    setSearchVisible(false);
    searchSubmit(query, location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Software engineer / teacher / ..."
          value={query}
          onChangeText={setQuery}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15, // Ensure no restrictive padding
  },
  searchContainer: {
    flexDirection: 'column',  // Stack inputs vertically
    alignItems: 'stretch',    // Stretch inputs to fill container width
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%', // Ensure it takes full width
  },
  input: {
    height: 50,  // Increased height
    fontSize: 18, // Increased font size
    color: '#333',
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 10, // Adjusted vertical padding
    backgroundColor: '#f1f1f1',
    marginBottom: 10, // Add some spacing between inputs
    width: 280, // Ensure it takes full width
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
