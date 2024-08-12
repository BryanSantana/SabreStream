import React from 'react';
import { View, TextInput, StyleSheet, Picker, Text } from 'react-native';

const SubscriptionTierCard = ({ tier, onTierChange }) => {
  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Tier Name"
        value={tier.name}
        onChangeText={(value) => onTierChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price ($)"
        keyboardType="numeric"
        value={tier.price}
        onChangeText={(value) => onTierChange('price', value)}
      />
      <Picker
        selectedValue={tier.duration}
        style={styles.picker}
        onValueChange={(itemValue) => onTierChange('duration', itemValue)}
      >
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Yearly" value="yearly" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
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

export default SubscriptionTierCard;
