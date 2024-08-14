import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateEventModal = ({ isVisible, onClose, onSubmit, formData, setFormData }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState("Date");
  const [time, setTime] = useState("Time")
  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toLocaleDateString();
    setDate(formattedDate)
    setFormData({ ...formData, date: date.toISOString() });
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(formattedTime);
    setFormData({ ...formData, time: time });
    setTimePickerVisibility(false);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(value) => handleFormChange('name', value)}
        />
       <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.datetime} onPress={() => setDatePickerVisibility(true)}>
            <Text>{date}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datetime} onPress={() => setTimePickerVisibility(true)}>
            <Text>{time}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          display={"inline"}
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
        <Button title="Submit" onPress={onSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  dateTimeContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  datetime: {
    width: '50%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
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

export default CreateEventModal;
