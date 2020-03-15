import { AsyncStorage } from 'react-native';

const deleteItem = (key) => AsyncStorage.removeItem(key);

const getItem = async (key) => {
  const data = await AsyncStorage.getItem(key);

  if (data) {
    const { value, expire } = JSON.parse(data);
    const currentTime = new Date().getTime() / 1000;

    if (expire >= currentTime) {
      return value;
    }
  }

  return null;
};

const setItem = (key, value, expire = 0) => {
  const expireTime = (new Date().getTime() / 1000) + expire;
  return AsyncStorage.setItem(key, JSON.stringify({ value, expire: expireTime }));
};

export { getItem, setItem, deleteItem };
