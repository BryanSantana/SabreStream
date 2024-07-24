// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title = "Register"
        onPress={() => navigation.navigate('Register as...')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default WelcomeScreen;


