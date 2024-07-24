import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminRegisterScreen from '../screens/AdminRegisterScreen';
import RegisterClub from '../screens/RegisterClub';
const Stack = createStackNavigator();

const AdminRegisterStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Register account" component={AdminRegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name= "Register Club" component = {RegisterClub} options = {{ headerShown: false }} />
        </Stack.Navigator>
      );
    };

export default AdminRegisterStack;