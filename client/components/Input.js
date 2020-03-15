import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1, padding: 5,
  },
});

const Input = ({
  label, value, onChange, type = 'default',
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textInput}
      onChangeText={onChange}
      value={value}
      keyboardType={type}
    />
  </View>
);

export default Input;
