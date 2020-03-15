import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header as HeaderBar, Input } from 'react-native-elements';
import { toggleDrawer } from '../services/navigation';

const styles = StyleSheet.create({
  search: {
    flex: 1,
    width: 200,
    alignItems: 'stretch',
    borderColor: 'red',
    borderWidth: 2,
  },
});

const Header = () => {
  const [term, setTerm] = useState('');
  // const navigation = useNavigation();

  // useEffect(() => () => {
  //   const fetchSymbols = async () => {
  //     try {
  //       const symbolsStorage = await getItem('symbols');
  //       let symbolsData = [];

  //       console.log('Hello');

  //       if (!symbolsStorage) {
  //         const data = await (await fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bpltuifrh5rdbt8o5fpg')).json();
  //         symbolsData = _.unionBy(data.map(({ description, symbol }) => ({ id: symbol, name: `${symbol} - ${description}` })).slice(-10), 'id');
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

  const onSearch = (symbol) => {
    console.log(symbol, 'asssd');
  };

  const renderSearchBar = () => (
    <View style={styles.search}>
      <Input
        placeholder="INPUT WITH ICON"
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <HeaderBar
        containerStyle={styles.container}
        leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={renderSearchBar()}
        rightComponent={{ icon: 'menu', color: '#fff', onPress: toggleDrawer }}
      />
    </SafeAreaView>
  );
};

export default Header;
