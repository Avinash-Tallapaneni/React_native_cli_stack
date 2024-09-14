import React from 'react';
import {View, StyleSheet} from 'react-native';
import DropdownComponent from '../components/DropdownComponent';
import ImagePicker from '../components/ImagePicker';

const FileUploadScreen = () => {
  return (
    <View style={styles.container}>
      {/* Dropdown Box */}
      <DropdownComponent />

      {/* image Upload */}

      <ImagePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FileUploadScreen;
