import { AsyncStorage } from 'react-native';

const api = async (url, opts) => {
  const token = (await AsyncStorage.getItem('JWT_USER_TOKEN')) || '';

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...opts,
  });
};
export default api;
