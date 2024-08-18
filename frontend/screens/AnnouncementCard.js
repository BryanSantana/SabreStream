import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AnnouncementCard = ({ announcement, onLike, currentUserId, onMoreOptions }) => {
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isCurrentUser = currentUserId === announcement.userId;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.profilePicture} />
        <Text style={styles.poster}>{announcement.User.name}</Text>
        {isCurrentUser && (
          <TouchableOpacity onPress={onMoreOptions}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.message}>{announcement.message}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
          <MaterialIcons
            name={announcement.likedByCurrentUser ? 'favorite' : 'favorite-border'}
            size={20}
            color={announcement.likedByCurrentUser ? 'red' : 'gray'}
          />
          <Text style={styles.likeCount}>{announcement.likesCount}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
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
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',  // Add this to push the "more-vert" icon to the right
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',  // Black circle as a placeholder for profile picture
    marginRight: 10,
  },
  poster: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,  // Add this to make sure the name takes up available space
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default AnnouncementCard;



