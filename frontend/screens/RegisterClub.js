import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
const RegisterClub = () => {
 return (
    <View style={styles.container}>
    <Text style ={styles.title}> Tell us a bit about your club </Text>
    <TextInput
    style = {styles.input}
    placeholder="Club Name"
    />
    <TextInput 
    style = {styles.input}
    placeholder=""
    />
    <Button title="Next" />
  </View>
);
};


const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
 },
 title: {
   fontSize: 24,
 },
 input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});


export default RegisterClub;