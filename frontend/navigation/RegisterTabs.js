import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemberRegisterScreen from '../screens/MemberRegisterScreen';
import AdminRegisterStack from './AdminRegisterStack';

const Tab = createMaterialTopTabNavigator();

const RegisterTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register as Member" component={MemberRegisterScreen} options={{ tabBarLabel: 'Club Member' }} />
      <Tab.Screen name="SecondTab" component={AdminRegisterStack} options={{ tabBarLabel: 'Club Admin' }} />
    </Tab.Navigator>
  );
};

export default RegisterTabs;
