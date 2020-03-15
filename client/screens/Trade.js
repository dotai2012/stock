import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import TradingView from '../components/TradingView';
import Order from '../components/Order';

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 10,
  },
});

const Trade = () => {
  const [amountBuy, setAmountBuy] = useState('');
  const [amountSell, setAmountSell] = useState('');

  const onTrade = (side) => {
    console.log(side);
  };

  return (
    <View style={styles.container}>
      <TradingView symbol="BINANCE:ETHBTC" />
      <Order title="Buy stock" side="buy" onSubmit={onTrade} value={amountBuy} onChange={setAmountBuy} />
      <Order title="Sell stock" side="sell" onSubmit={onTrade} value={amountSell} onChange={setAmountSell} />
    </View>
  );
};

export default Trade;
