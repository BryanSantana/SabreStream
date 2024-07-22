import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
const ProfileScreen = () => {
    const {logout} = useContext(AuthContext);
 return (
   <View style={styles.container}>
    <Button title = "Logout" onPress={() => {logout()}}> </Button>
     <Text style={styles.title}>Profile Screen</Text>
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


export default ProfileScreen;
