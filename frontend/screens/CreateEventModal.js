import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateEventModal = ({ isVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    type: ''
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleFormChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateConfirm = (date) => {
    setFormData({ ...formData, date: date.toLocaleDateString('en-US') });
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setFormData({ ...formData, time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
    setTimePickerVisibility(false);
  };

  const handleSubmit = () => {
    onSubmit(formData);  // Pass the form data to the parent component
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      type: ''
    });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => { onClose(); resetForm(); }}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#666"
          value={formData.name}
          onChangeText={(value) => handleFormChange('name', value)}
        />
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.datetime} onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.dateTimeText}>{formData.date || 'Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datetime} onPress={() => setTimePickerVisibility(true)}>
            <Text style={styles.dateTimeText}>{formData.time || 'Time'}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          display={"inline"}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
          display={"spinner"}
          minuteInterval={15}  // Set minute interval to 15
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#666"
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => { onClose(); resetForm(); }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    borderColor: '#000',  // Black border
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',  // White background
    color: '#000',  // Black text color
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  datetime: {
    width: '48%',
    padding: 12,
    borderColor: '#000',  // Black border
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',  // White background
  },
  dateTimeText: {
    color: '#000',  // Black text color
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
    backgroundColor: '#000',  // Black button
  },
  cancelButton: {
    backgroundColor: '#000',  // Black button
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 16,
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',  // Black border
    borderRadius: 4,
    color: 'black',  // Black text color
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',  // Black border
    borderRadius: 8,
    color: 'black',  // Black text color
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default CreateEventModal;
