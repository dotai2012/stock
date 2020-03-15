import React, { useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Input from './Input';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    marginTop: 20,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#2980b9',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
  },
});

const Order = ({
  title, side = 'buy', onSubmit, value, onChange, type = 'numeric',
}) => {
  const onDelegateSubmit = useCallback(
    () => onSubmit(side),
    [onSubmit, side],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Input label="Amount" value={value} onChange={onChange} type={type} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onDelegateSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{side}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;
