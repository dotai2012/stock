import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import { Card, Text } from 'react-native-elements';

import TradingView from '../components/TradingView';
import Order from '../components/Order';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quoteContainer: {
    alignItems: 'center',
  },
  quoteTitle: {
    fontSize: 20,
  },
  quoteItem: {
    fontSize: 18,
  },
});

const Trade = (props) => {
  const symbol = props.route?.params?.symbol || 'AAPL';
  const [amountBuy, setAmountBuy] = useState('');
  const [amountSell, setAmountSell] = useState('');
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuote = async () => {
      try {
        const data = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bpltuifrh5rdbt8o5fpg`, { signal: controller.signal })).json();
        setQuote(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchQuote();
    return () => controller.abort();
  }, [symbol]);

  const onTrade = (side) => {
    if (side === 'buy') {
      console.log('Bought, redirect to home page');
    } else {
      console.log('Sold, redirect to home page');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={100}>
      <ScrollView>
        <TradingView symbol={symbol} />
        <Card title={symbol} titleStyle={styles.quoteTitle}>
          <View style={styles.quoteContainer}>
            <Text>{`HIGH: ${quote.h || 0}`}</Text>
            <Text>{`OPEN: ${quote.o || 0}`}</Text>
            <Text>{`CLOSE: ${quote.c || 0}`}</Text>
            <Text>{`LOW: ${quote.l || 0}`}</Text>
          </View>
        </Card>
        <Order title="Buy stock" side="buy" onSubmit={onTrade} value={amountBuy} onChange={setAmountBuy} />
        <Order title="Sell stock" side="sell" onSubmit={onTrade} value={amountSell} onChange={setAmountSell} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Trade;
