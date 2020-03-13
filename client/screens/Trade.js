import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import TradingView from '../components/TradingView';

const Trade = () => (
  <View style={{ flex: 1 }}>
    <Header />
    <Text>This is Trade page</Text>
    <TradingView symbol="BINANCE:ETHBTC" />
  </View>
);

export default Trade;
