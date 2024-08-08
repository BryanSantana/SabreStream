import React,  { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { registerClub } from '../services/api';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';


const RegisterClub = ({ route, navigation}) => {
  const { firstName, name, email, password } = route.params;
  const [clubName, setClubName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  const handleRegister = async () => {
    try {
      const fullAddress = `${addressLine1} ${addressLine2} ${city} ${state} ${zip} ${country}`;
      const clubData = {
        name: clubName,
        address: fullAddress
      };
  
      const club = await registerClub(clubData);
      
      console.log(club);
      const clubId = club['id']
      const userData = {
        name, email, password, role:"admin", clubId
      }
      const user = await registerUser(userData)
      navigation.navigate("Set Up Stripe")
    } catch (error) {
      console.error('Error during club registration:', error);
    }
  };

 return (
    <View style={styles.container}>
    <Text style ={styles.title}> Tell us a bit about your club, {firstName} </Text>
    <TextInput
    style = {styles.input}
    placeholder="Club Name"
    value = {clubName}
    onChangeText={setClubName}
  
    />
    <TextInput 
    style = {styles.input}
    placeholder= "Address Line 1"
    value={addressLine1}
    onChangeText={setAddressLine1}
    />
     <TextInput 
    style = {styles.input}
    placeholder="Address Line 2"
    value={addressLine2}
    onChangeText={setAddressLine2}
    />
    <TextInput 
    style = {styles.input}
    placeholder = "Country"
    value={country}
    onChangeText={setCountry}
    />
    <TextInput
    style = {styles.input}
    placeholder= "State"
    value={state}
    onChangeText={setState}
    />
    <TextInput
    style= {styles.input}
    placeholder = "City"
    value={city}
    onChangeText={setCity}
    />
    <TextInput
    style = {styles.input}
    placeholder = "Zip/Postal Code"
    value={zip}
    onChangeText={setZip}
    />
    <Button title="Register" onPress={handleRegister} />
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


export default RegisterClub;