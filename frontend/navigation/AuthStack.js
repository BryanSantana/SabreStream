// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterTabs from './RegisterTabs';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register as..." component={RegisterTabs} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
