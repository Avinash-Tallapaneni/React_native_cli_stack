import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {colors} from '../styles/styles';

const data = [
  {label: 'Check-in', value: 'checkin'},
  {label: 'Check-out', value: 'checkout'},
];

const DropdownComponent = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        // search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Check-in, Check-out, or Both?"
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        renderItem={item => (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
          </View>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.blueCream,
  },
  dropdown: {
    height: 50,
    backgroundColor: colors.background,
    borderBottomColor: colors.text,
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.text,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.text,
  },
  textStyle: {
    fontSize: 14,
    color: colors.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: colors.text,
  },
  selectedStyle: {
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  item: {
    padding: 17,
    color: colors.text,
  },
});
