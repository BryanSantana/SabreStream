import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { getEventsByClubId, createEvent } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const EventScreen = ({ clubId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', location: '', type: 'Select an event type' });
  const { userInfo } = useContext(AuthContext);
  const userClub = userInfo['user']['clubId'];
  const userRole = userInfo['user']['role'];
  const userId = userInfo['user']['id'];
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEventsByClubId(userClub);
        setEvents(fetchedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userClub]);

  const handleCreateEvent = () => {
    setModalVisible(true);
  };

  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createEvent({ ...formData, clubId: userClub, userId: userId});
      setModalVisible(false);
      setFormData({ name: '', date: '', location: '', type: 'Class' });
      const fetchedEvents = await getEventsByClubId(userClub);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {userRole === 'admin' || userRole === 'coach' ? (
        <Button title="Create Event" onPress={handleCreateEvent} />
      ) : null}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleFormChange('name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={formData.date}
            onChangeText={(value) => handleFormChange('date', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={(value) => handleFormChange('location', value)}
          />
          <RNPickerSelect
            onValueChange={(value) => handleFormChange('type', value)}
            items={[
              { label: 'Class', value: 'Class' },
              { label: 'Practice', value: 'Practice' },
              { label: 'Camp', value: 'Camp' },
              { label: 'Event', value: 'Event' },
              { label: 'Other', value: 'Other' },
            ]}
            value={formData.type}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select an event type', value: null }}
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventItem: {
    marginBottom: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default EventScreen;

