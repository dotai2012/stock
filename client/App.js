import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RouteApp from './routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RouteApp />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
