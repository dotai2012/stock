import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RouteApp from './routes';
import Header from './components/Header';
import { navigation } from './services/navigation';
import { getItem } from './services/storage';
import api from './services/api';
import { baseUrl } from './config';

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getItem('token');
      const { status } = await api(`${baseUrl}/stock`);

      if (token && status === 200) {
        setAuth(token);
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, [auth]);

  return (
    <>
      {auth ? <Header /> : null}
      <NavigationContainer ref={navigation}>
        <RouteApp authLoading={authLoading} auth={auth} setAuth={setAuth} />
      </NavigationContainer>
    </>
  );
}
