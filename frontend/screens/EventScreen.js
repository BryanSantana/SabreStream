// EventScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getEventsByClubId} from '../services/api';
import { AuthContext } from '../context/AuthContext';

const EventScreen = ({ clubId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userInfo} = useContext(AuthContext);
  const userClub = userInfo['user']['clubId']

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log(userClub);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
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
});

export default EventScreen;
