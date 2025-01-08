const BASE_URL = 'https://script.google.com/macros/s/AKfycbwhrU5I2gXn2QqXBIhZlcnJC4PRWlU8Y7c9-UI20F6t1KC2D4CBA9kL-Z6EbnBNnuio/exec';

export const fetchMetrics = async (startDate, endDate) => {
  try {
    const response = await fetch(`${BASE_URL}?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
}; 