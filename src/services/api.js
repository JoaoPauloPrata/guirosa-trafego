const BASE_URL = 'https://script.google.com/macros/s/AKfycbxmT129EpzdTgYaHZwjMQhx0072nnbUKYW6xQ6klXuDk-cZbwtiUywsiBLfX1LmYzWDog/exec';

export const fetchMetrics = async (startDate, endDate) => {
  try {
    const response = await fetch(`${BASE_URL}?action=getData&startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
};

export const fetchCreativeUrls = async () => {
  try {
    const response = await fetch(`${BASE_URL}?action=getUrls`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar URLs dos criativos:', error);
    throw error;
  }
}; 