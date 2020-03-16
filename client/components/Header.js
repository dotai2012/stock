import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { Header as HeaderBar, Input } from 'react-native-elements';
import { toggleDrawer, navigate } from '../services/navigation';

const styles = StyleSheet.create({
  search: {
    width: 300,
  },
  searchInput: { backgroundColor: 'white', borderRadius: 3, padding: 10 },
});

const Header = () => {
  const [term, setTerm] = useState('');

  const onSearch = () => {
    if (term !== '') {
      navigate('Search', {
        term,
      });
    }
  };

  const renderSearchBar = () => (
    <View style={styles.search}>
      <Input
        autoFocus
        placeholder="Symbol - company to trade"
        leftIcon={{ name: 'search', color: 'white' }}
        inputStyle={styles.searchInput}
        value={term}
        onChangeText={setTerm}
        onSubmitEditing={onSearch}
      />
    </View>
  );

  return (
    <View>
      <HeaderBar
        containerStyle={styles.container}
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate('Home') }}
        centerComponent={renderSearchBar()}
        rightComponent={{ icon: 'menu', color: '#fff', onPress: toggleDrawer }}
      />
    </View>
  );
};

export default Header;
