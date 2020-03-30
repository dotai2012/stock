import { getItem } from './storage';

const api = async (url, opts) => {
  const token = (await getItem('token')) || '';

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...opts,
  });
};
export default api;
