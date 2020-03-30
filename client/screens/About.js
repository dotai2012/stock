import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Avatar, Text, Card, ListItem,
} from 'react-native-elements';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  teamContainer: {
    width: width * 0.9,
  },
});

const About = () => (
  <View style={styles.container}>
    <Avatar
      rounded
      size="xlarge"
      source={{
        uri: 'https://www.routerhosting.com/wp-content/uploads/image-result-for-crypto-currency-trading-bots.png',
      }}
    />
    <Text h1>Stock Trading Bot</Text>
    <Text h4>For educational purpose only</Text>
    <Card title="Team Members" containerStyle={styles.teamContainer}>
      <ListItem
        title="Tai Do"
        bottomDivider
      />
      <ListItem
        title="Thomas Ferris"
        bottomDivider
      />
      <ListItem
        title="Ibrahim Shahristani"
        bottomDivider
      />
      <ListItem
        title="Peter Choi"
        bottomDivider
      />
    </Card>
  </View>
);

export default About;
