import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const HomeScreen = () => {
 return (
   <View style={styles.container}>
     <Text style={styles.title}>At a Glance</Text>
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


export default HomeScreen;


