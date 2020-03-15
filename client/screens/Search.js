import React, { useState, useEffect, memo } from 'react';
import { FlatList } from 'react-native';
import _ from 'lodash';
import { ListItem } from 'react-native-elements';

import { getItem, setItem } from '../services/storage';

const Search = ({ route: { params: { term } } }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => () => {
    const fetchStocks = async () => {
      try {
        const stocksStorage = await getItem('stocks');
        let stocksData = [];

        if (!stocksStorage) {
          const data = await (await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bpltuifrh5rdbt8o5fpg')).json();
          stocksData = _.uniqBy(data.map(({ description, symbol }) => ({ id: symbol, name: `${symbol} - ${description}` })), 'id');
          await setItem('stocks', stocksData, 86400);
        } else {
          stocksData = stocksStorage;
        }

        setStocks(stocksData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStocks();
  }, []);

  const filterStocks = () => {
    const regex = new RegExp(`${term.trim()}`, 'i');
    return stocks.filter(({ name }) => name.search(regex) >= 0);
  };

  const renderItems = ({ item: { name } }) => {
    console.log(name);
    return (
      <ListItem
        title={name}
        bottomDivider
        chevron
      />
    );
  };

  return (
    <FlatList
      data={filterStocks()}
      renderItem={renderItems}
      keyExtractor={(item) => item.id}
    />
  );
};

export default memo(Search);
