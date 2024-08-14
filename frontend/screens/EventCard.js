import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EventCard = ({ event, userRole }) => {
  // Format the date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the time
  const formattedTime = new Date(event.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text>{formattedDate} at {formattedTime}</Text>
      <Text>{event.location}</Text>
      <Text>{event.type}</Text>
      {userRole === 'member' && (
        <Button title="Register" onPress={() => handleRegister(event.id)} />
      )}
    </View>
  );
};

const handleRegister = (eventId) => {
  // Logic for registering the user for the event
  console.log(`User registered for event with ID: ${eventId}`);
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default EventCard;
