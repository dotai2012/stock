import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Trade from './screens/Trade';
import About from './screens/About';
import Search from './screens/Search';
import { deleteItem } from './services/storage';
import Auth from './screens/Auth';
import Loading from './components/Loading';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerContent(props) {
  const delSession = async () => {
    try {
      await deleteItem('token');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    delSession();
    props.navigation.toggleDrawer();
    props.navigation.navigate('Login');
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
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Trade" component={Trade} />
    <Drawer.Screen name="About" component={About} />
  </Drawer.Navigator>
);

function RouteApp({ auth, authLoading, setAuth }) {
  const renderRoutes = () => {
    if (auth && !authLoading) {
      return (
        <>
          <Stack.Screen
            name="Root"
            component={Root}
          />
          <Stack.Screen name="Search" component={Search} />
        </>
      );
    } if (!auth && !authLoading) {
      return <Stack.Screen name="Auth" component={() => <Auth setAuth={setAuth} />} />;
    }
    return <Stack.Screen name="Loading" component={Loading} />;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {renderRoutes()}
    </Stack.Navigator>
  );
}

export default RouteApp;
