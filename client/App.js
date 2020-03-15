import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RouteApp from './routes';
import Header from './components/Header';
import { navigation } from './services/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Header />
      <NavigationContainer ref={navigation}>
        <RouteApp />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
