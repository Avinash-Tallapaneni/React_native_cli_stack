import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {colors} from '../styles/styles';
import {useDispatch} from 'react-redux';
import formSlice from '../redux/slice/formSlice.ts';

export interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: Date | null;
}

const Form = ({navigation}: any) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormDataProps>({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const validate = () => {
    let isValid = true;
    let newErrors = {name: '', email: '', phone: '', date: '', time: ''};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!formData.phone || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should be numeric';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof FormDataProps) => (text: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    if (currentDate) {
      setFormData(prev => ({
        ...prev,
        date: currentDate,
      }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime;
    setShowTimePicker(false);
    if (currentTime) {
      setFormData(prev => ({
        ...prev,
        time: currentTime,
      }));
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form data submitted:', formData);
      navigation.navigate('fileupload');
    }
  };

  const handleCardView = () => {
    if (validate()) {
      const serializedFormData = {
        ...formData,
        date: formData.date ? formData.date.toISOString() : null,
        time: formData.time ? formData.time.toISOString() : null,
      };
      dispatch(formSlice.actions.setFormData(serializedFormData));
      navigation.navigate('card');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: null,
      time: null,
    });
    setErrors({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={handleChange('name')}
            style={[styles.input, errors.name && styles.inputError]}
            placeholderTextColor={colors.lightText}
          />
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={handleChange('email')}
            style={[styles.input, errors.email && styles.inputError]}
            placeholderTextColor={colors.lightText}
            keyboardType="email-address"
          />
          {errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={handleChange('phone')}
            keyboardType="numeric"
            style={[styles.input, errors.phone && styles.inputError]}
            placeholderTextColor={colors.lightText}
          />
          {errors.phone ? (
            <Text style={styles.error}>{errors.phone}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Date</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateTimeButtonText}>
              {formData.date ? formData.date.toDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
          {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}
        </View>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Time</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateTimeButtonText}>
              {formData.time
                ? formData.time.toLocaleTimeString()
                : 'Select Time'}
            </Text>
          </TouchableOpacity>
          {errors.time ? <Text style={styles.error}>{errors.time}</Text> : null}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleCardView}>
          <Text style={styles.buttonText}>Card View </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Submit: (validated) -&gt; signin/ file upload screen.
        </Text>
        <Text style={styles.infoText}>
          Card View: (validated) -&gt; horizontal or vertical scrolling
        </Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={formData.date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={formData.time || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: colors.background,
    borderRadius: 10,
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    width: 80,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightText,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.inputBg,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  dateTimeButton: {
    backgroundColor: colors.inputBg,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  clearButtonText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  infoText: {
    fontSize: 12,
    color: colors.text,
  },
});

export default Form;
