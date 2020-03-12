import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Header from './components/Header';
import Home from './screens/Home';
import Trade from './screens/Trade';
import About from './screens/About';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

function RouteApp() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { height: 80 },
        header: ({ scene }) => <Header style={scene.descriptor.options.headerStyle} />,
      }}
      drawerContent={(props) => DrawerContent(props)}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Trade" component={Trade} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default RouteApp;
