class API {
    static BASE_URL = 'https://script.google.com/macros/s/AKfycbxwJrMUaJWVImTnub_CD60sm6HXSYJE36P3SZdRkJA46G2Yw_lV3aVQuc_GBQe2ErfE/exec';

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