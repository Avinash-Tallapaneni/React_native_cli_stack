import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {colors} from '../styles/styles';

interface ImageItem {
  uri: string;
  id: string;
}

interface ImagePickerProps {
  maxImages?: number;
}

export default function ImagePicker({maxImages}: ImagePickerProps) {
  const [images, setImages] = useState<ImageItem[]>([]);

  const openGallery = () => {
    const options = {
      mediaType: 'photo' as const,
      selectionLimit: maxImages || 0,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets?.map((asset: Asset) => ({
          uri: asset.uri || '',
          id: `${
            asset.fileName || 'image'
          }_${Date.now()}_${Math.random().toString(36)}`,
        }));
        if (selectedImages) {
          setImages(prevImages => [...prevImages, ...selectedImages]);
        }
      }
    });
  };

  const removeImage = (id: string) => {
    setImages(prevImages => prevImages.filter(img => img.id !== id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Select Images</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map(img => (
          <View key={img.id} style={styles.imageCard}>
            <Image
              source={{uri: img.uri} as ImageSourcePropType}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(img.id)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageCard: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
