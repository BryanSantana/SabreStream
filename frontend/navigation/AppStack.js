// AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStack;

