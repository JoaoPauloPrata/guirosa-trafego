const BASE_URL = 'https://script.google.com/macros/s/AKfycbx05xA4T91acrvQYRLwsBWMLpHgU19PtWTdnJ9wCbS-uAMd419pKRQqwlFaKAzviENuXg/exec';

export const fetchMetrics = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}?data=${date}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
}; 