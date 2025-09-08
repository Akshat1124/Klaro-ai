import API from './api';

export const getRecommendations = async () => {
  try {
    const response = await API.get('/recommendations');
    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
// Services should only handle API calls.