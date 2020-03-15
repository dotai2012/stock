import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Text, Input } from 'react-native-elements';


// const styles = StyleSheet.create({
//   label: {
//     marginBottom: 10,
//   },
//   textInput: {
//     height: 40, borderColor: 'gray', borderWidth: 1, padding: 5,
//   },
// });

const FormInput = ({
  label, value, onChange, type = 'default',
}) => (
  <View>
    <Text h3>{label}</Text>
    <Input
      placeholder={label}
      onChangeText={onChange}
      value={value}
      keyboardType={type}
    />
  </View>
);

export default FormInput;
