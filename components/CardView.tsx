import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/store';

interface CardViewProps {
  cardNumber: number;
  cardWidth?: number;
  cardHeight?: number;
}

const CardView = ({cardNumber, cardWidth, cardHeight}: CardViewProps) => {
  const formData = useSelector((state: RootState) => state.form);

  return (
    <View
      style={[styles.cardContainer, {width: cardWidth, height: cardHeight}]}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>card no : {cardNumber + 1}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Name:</Text>
          <Text style={styles.cardText}>{formData.name}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Email:</Text>
          <Text style={styles.cardText}>{formData.email}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Phone:</Text>
          <Text style={styles.cardText}>{formData.phone}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Date:</Text>
          <Text style={styles.cardText}>
            {formData.date && new Date(formData.date).toDateString()}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Time:</Text>
          <Text style={styles.cardText}>
            {formData.time && new Date(formData.time).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.text,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android
    margin: 15,
    padding: 15,
    overflow: 'hidden',
  },
  cardContent: {
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  cardText: {
    fontSize: 16,
    color: colors.lightText,
  },
});
