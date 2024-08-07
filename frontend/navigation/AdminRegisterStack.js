import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminRegisterScreen from '../screens/AdminRegisterScreen';
import RegisterClub from '../screens/RegisterClub';
import StripeSetup from '../screens/StripeSetup'
const Stack = createStackNavigator();

const AdminRegisterStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Register account" component={AdminRegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name= "RegisterClub" component = {RegisterClub} options = {{ headerShown: false }} />
          <Stack.Screen name= "Set Up Stripe" component = {StripeSetup} options = {{ headerShown: false}} />
        </Stack.Navigator>
      );
    };

export default AdminRegisterStack;