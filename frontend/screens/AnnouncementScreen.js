import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAnnouncementsByClubId, createAnnouncement, likeAnnouncement, unlikeAnnouncement } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AnnouncementCard from './AnnouncementCard';
import Modal from 'react-native-modal';

const AnnouncementScreen = ({ clubId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ message: '' });
  const { userInfo } = useContext(AuthContext);
  const userClub = userInfo['user']['clubId'];
  const userRole = userInfo['user']['role'];
  const userId = userInfo['user']['id'];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const fetchedAnnouncements = await getAnnouncementsByClubId(userClub, userId);
        setAnnouncements(fetchedAnnouncements);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [userClub]);

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
      const fetchedAnnouncements = await getAnnouncementsByClubId(userClub, userId);
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleLike = async (announcementId) => {
    try {
      const announcement = announcements.find(a => a.id === announcementId);
      const isLiked = announcement.likedByCurrentUser;

      if (isLiked) {
        await unlikeAnnouncement({ userId, announcementId });
        const updatedAnnouncements = announcements.map(announcement => {
          if (announcement.id === announcementId) {
            return { ...announcement, likesCount: announcement.likesCount - 1, likedByCurrentUser: false };
          }
          return announcement;
        });
        setAnnouncements(updatedAnnouncements);
      } else {
        await likeAnnouncement({ userId, announcementId });
        const updatedAnnouncements = announcements.map(announcement => {
          if (announcement.id === announcementId) {
            return { ...announcement, likesCount: announcement.likesCount + 1, likedByCurrentUser: true };
          }
          return announcement;
        });
        setAnnouncements(updatedAnnouncements);
      }
    } catch (error) {
      console.error('Error liking/unliking announcement:', error);
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
        <Text style={styles.title}>Announcements</Text>
        {userRole === 'admin' || userRole === 'coach' ? (
          <TouchableOpacity onPress={handleCreateAnnouncement} style={styles.iconButton}>
            <Icon name="plus" size={12} color="#000000" />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnnouncementCard
            announcement={item}
            currentUserId={userId} // Pass the currentUserId to AnnouncementCard
            onLike={() => handleLike(item.id)}
          />
        )}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Announcement</Text>
          <TextInput
            style={styles.input}
            placeholder="Message"
            value={formData.message}
            onChangeText={(value) => handleFormChange('message', value)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  submitButton: {
    backgroundColor: '#000',
  },
  cancelButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AnnouncementScreen;

