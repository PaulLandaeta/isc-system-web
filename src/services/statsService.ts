import apiClient from './apiInstance';

export const getStats = async () => {
  const response = await apiClient.get('/stats');
  return response.data;
};
