import { getItem } from './storage';

const api = async (url, opts) => {
  const token = (await getItem('token')) || '';

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...opts,
  });
};
export default api;
