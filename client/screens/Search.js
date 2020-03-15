import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { getItem, setItem } from '../services/storage';

const Search = ({ route: { params: { term } } }) => {
  const [symbols, setSymbols] = useState([]);
  console.log(term);

  // useEffect(() => () => {
  //   const fetchSymbols = async () => {
  //     try {
  //       const symbolsStorage = await getItem('symbols');
  //       let symbolsData = [];

  //       if (!symbolsStorage) {
  //         const data = await (await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bpltuifrh5rdbt8o5fpg')).json();
  //         symbolsData = _.uniqBy(data.map(({ description, symbol }) => ({ id: symbol, name: `${symbol} - ${description}` })), 'id');
  //         await setItem('symbols', symbolsData, 86400);
  //       } else {
  //         symbolsData = symbolsStorage;
  //       }

  //       setSymbols(symbolsData);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchSymbols();
  // }, []);

  return (
    <View>
      <Text>This is Search page</Text>
    </View>
  );
};

export default Search;
