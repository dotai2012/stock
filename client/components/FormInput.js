import React from 'react';
import { View } from 'react-native';
import { Text, Input } from 'react-native-elements';

const FormInput = ({
  label, value, onChange, type = 'default',
}) => (
  <View>
    <Text h5>
      {label}
      :
      {' '}
    </Text>
    <Input
      placeholder={label}
      onChangeText={onChange}
      value={value}
      keyboardType={type}
    />
  </View>
);

export default FormInput;
