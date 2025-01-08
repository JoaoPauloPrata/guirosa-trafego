class App {
    static async initialize() {
        this.setupDateSelector();
        await this.loadData();
    }

    static setupDateSelector() {
        const dateSelector = document.getElementById('dateSelector');
        const today = new Date().toISOString().split('T')[0];
        dateSelector.value = today;
        dateSelector.addEventListener('change', () => this.loadData());
    }

    static async loadData() {
        const dateSelector = document.getElementById('dateSelector');
        const metrics = await API.fetchMetrics(dateSelector.value);
        
        if (metrics && metrics.status === 'success') {
            this.updateMetrics(metrics.data);
        }
    }

    static updateMetrics(data) {
        const totals = data.reduce((acc, item) => {
            acc.alcance += Number(item.Alcance) || 0;
            acc.clicks += Number(item['Clicks no Link']) || 0;
            acc.conversas += Number(item['Conversas Iniciadas']) || 0;
            acc.impressoes += Number(item['Impressões']) || 0;
            acc.investimento += Number(item['Investimento']) || 0;
            return acc;
        }, {
            alcance: 0,
            clicks: 0,
            conversas: 0,
            impressoes: 0,
            investimento: 0
        });

        // Cálculos derivados
        const ctr = totals.impressoes > 0 ? (totals.clicks / totals.impressoes) * 100 : 0;
        const cpm = totals.impressoes > 0 ? (totals.investimento / totals.impressoes) * 1000 : 0;
        const cpc = totals.clicks > 0 ? totals.investimento / totals.clicks : 0;
        const custoConversa = totals.conversas > 0 ? totals.investimento / totals.conversas : 0;

        // Atualiza a interface
        document.getElementById('alcance').textContent = this.formatNumber(totals.alcance);
        document.getElementById('clicks').textContent = this.formatNumber(totals.clicks);
        document.getElementById('conversas').textContent = this.formatNumber(totals.conversas);
        document.getElementById('impressoes').textContent = this.formatNumber(totals.impressoes);
        document.getElementById('investimento').textContent = this.formatCurrency(totals.investimento);
        document.getElementById('ctr').textContent = this.formatPercent(ctr);
        document.getElementById('cpm').textContent = this.formatCurrency(cpm);
        document.getElementById('cpc').textContent = this.formatCurrency(cpc);
        document.getElementById('custoConversa').textContent = this.formatCurrency(custoConversa);
    }

    static formatNumber(value) {
        return new Intl.NumberFormat('pt-BR').format(value);
    }

    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    static formatPercent(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.initialize();
}); 