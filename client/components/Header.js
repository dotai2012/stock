import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  search: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

const Header = ({ style }) => {
  const [term, setTerm] = useState('');
  const navigation = useNavigation();

  const onToggleMenu = () => {
    navigation.openDrawer();
  };

  const onSearch = () => {

  };

  return (
    <SafeAreaView>
      <View style={{ ...style, ...styles.container }}>
        <Text>Logo</Text>
        <TextInput
          style={styles.search}
          onChangeText={setTerm}
          value={term}
        />
        <TouchableOpacity  onPress={onToggleMenu}>
          <Text>Menu</Text>
        </TouchableOpacity >
      </View>
    </SafeAreaView>
  );
};

export default Header;
