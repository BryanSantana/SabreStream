import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
const MemberRegisterScreen = () => {
 return (
    <View style={styles.container}>
    <TextInput
    style={styles.input}
    placeholder = "Club Code"
    />
    <TextInput
    style = {styles.input}
    placeholder="First Name"
    />
    <TextInput 
    style = {styles.input}
    placeholder="Last Name"
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      //value={email}
      //onChangeText={text => setEmail(text)}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      //value={password}
      onChangeText={text => setPassword(text)}
      secureTextEntry
    />
    <Button title="Next"/>
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


export default MemberRegisterScreen;