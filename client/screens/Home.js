import React, { useCallback, useState } from 'react';
import {
  Text, View, StyleSheet, Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  Card, ListItem, Button,
} from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import api from '../services/api';
import { baseUrl, finnhubToken } from '../config';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  totalPortfolio: {
    fontSize: 40,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
});

const Home = () => {
  const [total, setTotal] = useState(0);
  const [portfolios, setPortfolio] = useState([{ date: moment().format('MM-DD-YYYY'), total: 0 }]);
  const [stocks, setStocks] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(useCallback(
    () => {
      const controller = new AbortController();

      const fetchInfo = async () => {
        try {
          const fetchPortfolios = (await (await api(`${baseUrl}/portfolio`, { signal: controller.signal })).json());
          const fetchStocks = (await (await api(`${baseUrl}/stock`, { signal: controller.signal })).json()).filter(({ balance }) => balance !== 0);
          const fetchPositions = await (await api(`${baseUrl}/position`, { signal: controller.signal })).json();

          const totalPortfolio = await fetchStocks.reduce(async (accumulator, { symbol, balance }) => {
            const quote = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubToken}`, { signal: controller.signal })).json();

            return (await accumulator) + balance * quote.c;
          }, Promise.resolve(0));

          setPortfolio(fetchPortfolios);
          setStocks(fetchStocks);
          setPositions(fetchPositions);
          setTotal(totalPortfolio);
        } catch (e) {
          console.error(e);
        }
      };

      fetchInfo();

      return () => controller.abort();
    },
    [],
  ));

  const renderPerformance = () => {
    const listDates = portfolios.map(({ date }) => moment(new Date(date)).format('MM-DD-YYYY'));
    const listPerformances = portfolios.map((position) => position.total);

    return (
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: listDates,
            datasets: [
              {
                data: listPerformances,
              },
            ],
          }}
          width={width * 0.9}
          height={220}
          yAxisLabel="$"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#2980b9',
            backgroundGradientFrom: '#2980b9',
            backgroundGradientTo: '#3498db',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#2c3e50',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };

  const renderStocks = () => (stocks.length > 0 ? stocks.map(({ id, symbol, balance }) => (
    <ListItem
      key={id}
      title={symbol}
      subtitle={`${balance} share(s)`}
      rightElement={(
        <Button
          title="Trade"
          onPress={() => navigation.navigate('Trade', { symbol })}
        />
      )}
    />
  )) : <Text>You have not bought anything yet</Text>);

  const renderPositions = () => (positions.length > 0 ? positions.map(({ symbol, price, quantity }) => (
    <ListItem
      key={symbol}
      title={symbol}
      subtitle={`Bought at: $${price} - Amount: ${quantity}`}
    />
  )) : <Text>There is no open position</Text>);

  return (
    <View>
      <Card title="Current Portfolio Value">
        <Text style={styles.totalPortfolio}>
          $
          {total}
        </Text>
      </Card>
      <Card title="Performance">
        {renderPerformance()}
      </Card>
      <Card title="Available Stocks">
        {renderStocks()}
      </Card>
      <Card title="Open Positions">
        {renderPositions()}
      </Card>
    </View>
  );
};

export default Home;
