// AnnoucnementScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getAnnouncementsByClubId} from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AnnouncementScreen = ({ clubId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userInfo} = useContext(AuthContext);
  const userClub = userInfo['user']['clubId']

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const fetchedAnnouncements = await getAnnouncementsByClubId(userClub);
        setAnnouncements(fetchedAnnouncements);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [userClub]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.announcementItem}>
            <Text style={styles.announcementName}>{item.name}</Text>
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
  announcementItem: {
    marginBottom: 15,
  },
  announcementName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnnouncementScreen;
