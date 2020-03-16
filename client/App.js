import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RouteApp from './routes';
import Header from './components/Header';
import { navigation } from './services/navigation';

export default function App() {
  return (
    <>
      <Header />
      <NavigationContainer ref={navigation}>
        <RouteApp />
      </NavigationContainer>
    </>
  );
}
