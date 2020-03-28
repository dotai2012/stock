import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import FormInput from './FormInput';

const styles = StyleSheet.create({
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
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
});

const Order = ({
  title, type = 'buy', onSubmit, value, onChange, input = 'numeric',
}) => {
  const onDelegateSubmit = useCallback(
    () => onSubmit(type),
    [onSubmit, type],
  );

  return (
    <Card title={title} titleStyle={styles.title}>
      <FormInput label="Amount" value={value} onChange={onChange} type={input} />
      <Button
        title={title}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={onDelegateSubmit}
      />
    </Card>
  );
};

export default Order;
