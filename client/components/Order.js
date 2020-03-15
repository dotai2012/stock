import React, { useCallback } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import FormInput from './FormInput';

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 2,
//     marginTop: 20,
//     padding: 20,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     margin: 10,
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     backgroundColor: '#2980b9',
//     borderRadius: 3,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'white',
//     textTransform: 'uppercase',
//   },
// });

const Order = ({
  title, side = 'buy', onSubmit, value, onChange, type = 'numeric',
}) => {
  const onDelegateSubmit = useCallback(
    () => onSubmit(side),
    [onSubmit, side],
  );

  return (
    <View>
      <Text>{title}</Text>
      <FormInput label="Amount" value={value} onChange={onChange} type={type} />
      <Button
        icon={{
          name: 'arrow-right',
          size: 15,
          color: 'white',
        }}
        title={title}
        onPress={onDelegateSubmit}
      />
    </View>
  );
};

export default Order;
