import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEventsByClubId, createEvent, deleteEvent, updateEvent } from '../services/api'; // Assuming you have delete and update event services
import { AuthContext } from '../context/AuthContext';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';

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

  const handleSubmit = async (formData) => {
    const { name, date, location, type } = formData;
    if (!name || !date || !location || !type) {
      alert('All fields are required.');
      return;
    }
  
    try {
      await createEvent({ ...formData, clubId: userClub, userId: userId });
      setModalVisible(false);
      setFormData({ name: '', date: '', location: '', type: 'Class' });
      const fetchedEvents = await getEventsByClubId(userClub);
      setEvents(fetchedEvents);
      setFormData({ name: '', date: '', location: '', type: 'Class' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  

  const handleEditEvent = async (event) => {
    setFormData(event);
    setModalVisible(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await deleteEvent(eventId);
  
      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId));
        Alert.alert('Success', 'Event deleted successfully');
      } else {
        Alert.alert('Error', 'Could not delete the event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Could not delete the event');
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
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        {userRole === 'admin' || userRole === 'coach' ? (
          <TouchableOpacity onPress={handleCreateEvent} style={styles.iconButton}>
            <Icon name="plus" size={12} color="#000000" />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            userRole={userRole}
            onEdit={() => handleEditEvent(item)}
            onDelete={() => handleDeleteEvent(item.id)}
          />
        )}
      />
      <CreateEventModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
  },
});

export default EventScreen;






