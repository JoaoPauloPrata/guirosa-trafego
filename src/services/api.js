const BASE_URL = 'https://script.google.com/macros/s/AKfycbxwJrMUaJWVImTnub_CD60sm6HXSYJE36P3SZdRkJA46G2Yw_lV3aVQuc_GBQe2ErfE/exec';

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