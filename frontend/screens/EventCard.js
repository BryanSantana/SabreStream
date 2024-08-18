import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EventCard = ({ event, userRole, onEdit, onDelete }) => {
  const formattedStartDate = new Date(event.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <TouchableOpacity>
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eventName}>{event.name}</Text>
        {/* Menu for edit and delete actions */}
        {(userRole === 'admin' || userRole === 'coach') && (
          <Menu>
            <MenuTrigger>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions>
            <MenuOption onSelect={onEdit}>
                <Text style={styles.editOption}>Edit</Text>
              </MenuOption>
              <MenuOption onSelect={onDelete}>
                <Text style={styles.deleteOption}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
      </View>
      <Text>{formattedStartDate} at {event.startTime}</Text>
      <Text>{event.location}</Text>
      <Text>{event.type}</Text>
      {userRole === 'member' && (
        <Button title="Register" onPress={() => handleRegister(event.id)} />
      )}
    </View>
    </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editOption: {
    color: 'black',
  },
  deleteOption: {
    color: 'red',
  },
});

export default EventCard;


