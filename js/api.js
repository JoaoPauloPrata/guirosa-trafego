class API {
    static BASE_URL = 'https://script.google.com/macros/s/AKfycbw34wqtUPARBkfjW6NL2Q7Y4rMnzzFt0xFabK0RTb-BfVQjEHMOJS6OIIrd5IsU9BDIQg/exec';

    static async fetchMetrics(date) {
        try {
            const response = await fetch(`${this.BASE_URL}?data=${date}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar métricas:', error);
            return null;
        }
    }
} 