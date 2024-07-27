// AnnouncementScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import { getAnnouncementsByClubId, createAnnouncement } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Modal from 'react-native-modal';

const AnnouncementScreen = ({ clubId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ message: '' });
  const userClub = userInfo['user']['clubId'];
  const userRole = userInfo['user']['role'];
  const userId = userInfo['user']['id'];

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

  const handleCreateAnnouncement = () => {
    setModalVisible(true);
  };

  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date().toISOString();
      await createAnnouncement({ ...formData, date: currentDate, userId: userId, clubId: userClub });
      setModalVisible(false);
      setFormData({ message: '' });
      const fetchedAnnouncements = await getAnnouncementsByClubId(userClub);
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>
      {userRole === 'admin' || userRole === 'coach' ? (
        <Button title="Create Announcement" onPress={handleCreateAnnouncement} />
      ) : null}
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.announcementItem}>
            <Text style={styles.announcementMessage}>{item.message}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Text>Posted by: {item.User.name}</Text>
          </View>
        )}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Announcement</Text>
          <TextInput
            style={styles.input}
            placeholder="Message"
            value={formData.message}
            onChangeText={(value) => handleFormChange('message', value)}
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
  announcementItem: {
    marginBottom: 15,
  },
  announcementMessage: {
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

export default AnnouncementScreen;
