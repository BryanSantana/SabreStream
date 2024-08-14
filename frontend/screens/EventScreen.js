import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { getEventsByClubId, createEvent } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';  // Import the CreateEventModal

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

  const handleSubmit = async () => {
    try {
      await createEvent({ ...formData, clubId: userClub, userId: userId });
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
          <EventCard event={item} userRole={userRole} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EventScreen;




