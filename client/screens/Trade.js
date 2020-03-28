import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import { Card, Text } from 'react-native-elements';

import TradingView from '../components/TradingView';
import Order from '../components/Order';
import { navigate } from '../services/navigation';

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

  const onTrade = async (type) => {
    try {
      // TODO: fix relative url and userID
      await fetch('/api/trade', {
        method: 'POST',
        body: JSON.stringify({
          type,
          symbol,
          price: quote.c,
          quantity: amountBuy,
          userId: 1,
        }),
      });

      navigate('Home');
    } catch (e) {
      console.error(e);
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
        <Order title="Buy stock" type="buy" onSubmit={onTrade} value={amountBuy} onChange={setAmountBuy} />
        <Order title="Sell stock" type="sell" onSubmit={onTrade} value={amountSell} onChange={setAmountSell} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Trade;
