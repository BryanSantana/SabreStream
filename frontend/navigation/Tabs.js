import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import { MenuProvider } from 'react-native-popup-menu';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <MenuProvider>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Events" component={EventScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Announcement" component={AnnouncementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
    </MenuProvider>
  );
};

export default Tabs;
