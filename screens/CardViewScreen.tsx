import React, {useState} from 'react';
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import CardView from '../components/CardView';
import {colors} from '../styles/styles';

const CardViewScreen = ({navigation}: any) => {
  const [isVertical, setIsVertical] = useState(true);
  const {width, height} = useWindowDimensions();

  const cardWidth = width * 0.7; // 70% of screen width
  const cardHeight = height * 0.35; // 50% of screen height

  // Dummy data to render in FlatList
  const data = Array(10).fill(0);

  return (
    <View style={styles.container}>
      {/* Toggle Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Vertical Scroll" onPress={() => setIsVertical(true)} />
        <Button
          title="Horizontal Scroll"
          onPress={() => setIsVertical(false)}
        />
      </View>

      {/* FlatList for Rendering CardView */}
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CardView
            key={item - index}
            cardNumber={index}
            cardWidth={isVertical ? undefined : cardWidth}
            cardHeight={isVertical ? undefined : cardHeight}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal={!isVertical}
        style={isVertical ? styles.verticalList : styles.horizontalList}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('home')}>
          <Text style={styles.buttonText}>Go to home </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  verticalList: {
    flex: 1,
    backgroundColor: colors.blueCream,
  },
  horizontalList: {
    flexGrow: 0,
    backgroundColor: colors.blueCream,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
