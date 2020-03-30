import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RouteApp from './routes';
import Header from './components/Header';
import { navigation } from './services/navigation';
import { getItem } from './services/storage';

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getItem('token');

      if (token) {
        setAuth(auth);
        setAuthLoading(false);
      }
    };

    fetchToken();
  }, [auth]);

  return (
    <>
      {auth ? <Header /> : null}
      <NavigationContainer ref={navigation} authLoading={authLoading} auth={auth}>
        <RouteApp />
      </NavigationContainer>
    </>
  );
}
