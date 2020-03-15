import React from 'react';
import { DrawerActions } from '@react-navigation/native';

const navigation = React.createRef();

function navigate(name, params) {
  return navigation.current?.navigate(name, params);
}

function toggleDrawer() {
  return navigation.current?.dispatch(DrawerActions.toggleDrawer());
}

export {
  navigation, navigate, toggleDrawer,
};
