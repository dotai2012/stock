import React, { useEffect, useState } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

const About = () => {
  const [toggle, setToggle] = useState(false);

  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value == null) {
        console.log('you are not logged in!!!');
        return setToggle(true);
      } if (value != null) {
        return setToggle(false);
      }
    } catch (error) {
      console.log('error with token:', error);
      return false;
    }
  };

  useEffect(() => {
    retrieveToken();
  });

  return (
    <View>
      {toggle === true ? <Text>You must be logged in to see this page</Text> : <Text>This is About page</Text>}
    </View>
  );
};

export default About;
