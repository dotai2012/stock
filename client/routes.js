import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';

import Login from './screens/Login';
import Home from './screens/Home';
import Trade from './screens/Trade';
import About from './screens/About';
import Search from './screens/Search';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerContent(props) {
  const delSession = async () => {
    try {
      const value = await AsyncStorage.removeItem('JWT_USER_TOKEN');
      if (value !== null) {
        console.log('session deleted');
      } else {
        console.log('no token');
      }
    } catch (error) {
      console.log('problem deleting session', error);
    }
  };

  const handleLogout = () => {
    props.navigation.toggleDrawer();
    delSession();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => handleLogout()}
      />
    </DrawerContentScrollView>
  );
}

const Root = () => (
  <Drawer.Navigator
    drawerContent={(props) => DrawerContent(props)}
  >
    <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Trade" component={Trade} />
    <Drawer.Screen name="About" component={About} />
  </Drawer.Navigator>
);

function RouteApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Root"
        component={Root}
      />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default RouteApp;
