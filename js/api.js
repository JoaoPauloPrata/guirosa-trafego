class API {
    static BASE_URL = 'https://script.google.com/macros/s/AKfycbz-XOgosqjTIcBuPBSpU7_YkQPYXa9NdkgQU9_FQChDAJrXNeGoPY9pfUGOt14Jy0aS/exec';

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