import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const TierScreen = ({navigation, route}) => {
    console.log("ROUTE PARAMS")
    console.log(route.params)
    const { accountId, userId, clubId } = route.params

    //State for managing tiers
    const [tiers, setTiers] = useState([{ name: '', price: '', duration: 'monthly' }]);

     // State for managing dropdowns
  const [open, setOpen] = useState(false); 
  const [value, setValue] = useState('monthly');
  const [items, setItems] = useState([
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ]);

  const handleAddMore = () => {
    setTiers([...tiers, { name: '', price: '', duration: 'monthly' }]);
  };

  const handleTierChange = (index, field, value) => {
    const newTiers = [...tiers];
    newTiers[index][field] = value;
    setTiers(newTiers);
  };

  const renderTierItem = ({ item, index }) => (
    <View key={index} style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Tier Name"
        value={item.name}
        onChangeText={(value) => handleTierChange(index, 'name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price ($)"
        keyboardType="numeric"
        value={item.price}
        onChangeText={(value) => handleTierChange(index, 'price', value)}
      />
      <DropDownPicker
        open={open}
        value={item.duration}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          handleTierChange(index, 'duration', callback(value));
          setValue(callback);
        }}
        setItems={setItems}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownStyle={styles.dropdownStyle}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Subscription Costs</Text>
      <Text style={styles.body}>Add all tiers for monthly subscriptions and any yearly fees here</Text>
      <FlatList
        data={tiers}
        renderItem={renderTierItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Add More" onPress={handleAddMore} />
      <Button title="Submit Tiers" onPress={() => { /* Handle Submit */ }} />
    </View>
  );
};


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center',
        },
        body: {
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 20,
        },
        scrollContainer: {
          flex: 1,
          width: '100%',
        },
        card: {
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#f5f5f5',
          borderRadius: 10,
          borderColor: '#ddd',
          borderWidth: 1,
        },
        input: {
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10,
        },
        picker: {
          height: 50,
          width: '100%',
          marginBottom: 10,
        },
      });


export default TierScreen;