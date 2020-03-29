import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

const Home = (props) => {
  const  [toggle, setToggle] = useState(false)

  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('JWT_USER_TOKEN');
      if (value == null) {
        console.log("you are not logged in!!!");
        return setToggle(true)
      } else {
        return setToggle(false)
      }
    } catch (error) {
      console.log("error with token:", error)
      return false
    }
  };

  useEffect(() => {
     retrieveToken()
     
    })
    
return( 
  <View>
   {toggle == true ? <Text>You must be logged in to see this page</Text> : <Text>This is Home page</Text>}
  </View>
 )
};

export default Home;
