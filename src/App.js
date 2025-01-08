import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchMetrics } from './services/api';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import DateSelector from './components/DateSelector';
import CampaignSelector from './components/CampaignSelector';
import Loading from './components/Loading';

function App() {
  const [metrics, setMetrics] = useState({
    alcance: 0,
    clicks: 0,
    conversas: 0,
    impressoes: 0,
    investimento: 0,
    ctr: 0,
    cpm: 0,
    cpc: 0,
    custoConversa: 0
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  useEffect(() => {
    if (rawData.length > 0) {
      const filteredData = selectedCampaign
        ? rawData.filter(item => item.Campanha === selectedCampaign)
        : rawData;
      calculateMetrics(filteredData);
    }
  }, [selectedCampaign, rawData]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchMetrics(selectedDate);
      if (response.status === 'success') {
        setRawData(response.data);
        // Extrair campanhas únicas
        const uniqueCampaigns = [...new Set(response.data.map(item => item.Campanha))];
        setCampaigns(uniqueCampaigns);
        calculateMetrics(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedCampaign(''); // Reset campaign filter when date changes
  };

  const handleCampaignChange = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const calculateMetrics = (data) => {
    const totals = data.reduce((acc, item) => ({
      alcance: acc.alcance + (Number(item.Alcance) || 0),
      clicks: acc.clicks + (Number(item['Clicks no Link']) || 0),
      conversas: acc.conversas + (Number(item['Conversas Iniciadas']) || 0),
      impressoes: acc.impressoes + (Number(item['Impressões']) || 0),
      investimento: acc.investimento + (Number(item['Investimento']) || 0)
    }), {
      alcance: 0,
      clicks: 0,
      conversas: 0,
      impressoes: 0,
      investimento: 0
    });

    const ctr = totals.impressoes > 0 ? (totals.clicks / totals.impressoes) * 100 : 0;
    const cpm = totals.impressoes > 0 ? (totals.investimento / totals.impressoes) * 1000 : 0;
    const cpc = totals.clicks > 0 ? totals.investimento / totals.clicks : 0;
    const custoConversa = totals.conversas > 0 ? totals.investimento / totals.conversas : 0;

    setMetrics({ ...totals, ctr, cpm, cpc, custoConversa });
  };

  return (
    <div className="App">
      {isLoading && <Loading />}
      <Header />
      <main>
        <div className="filters">
          <DateSelector 
            value={selectedDate} 
            onChange={handleDateChange}
            disabled={isLoading}
          />
          <CampaignSelector
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            onChange={handleCampaignChange}
            disabled={isLoading}
          />
        </div>
        
        <section className="metrics-list">
          <MetricCard
            icon="alcance"
            label="Alcance"
            value={metrics.alcance}
            format="number"
          />
          <MetricCard
            icon="clicks"
            label="Clicks no Link"
            value={metrics.clicks}
            format="number"
          />
          <MetricCard
            icon="conversas"
            label="Conversas Iniciadas"
            value={metrics.conversas}
            format="number"
          />
          <MetricCard
            icon="custoconversa"
            label="Custo por Conversa Iniciada"
            value={metrics.custoConversa}
            format="currency"
          />
          <MetricCard
            icon="impressoes"
            label="Impressões"
            value={metrics.impressoes}
            format="number"
          />
          <MetricCard
            icon="investimento"
            label="Investimento"
            value={metrics.investimento}
            format="currency"
          />
          <MetricCard
            icon="ctr"
            label="Taxa de Clicks (CTR)"
            value={metrics.ctr}
            format="percent"
          />
          <MetricCard
            icon="cpm"
            label="Custo por Mil Imp. (CPM)"
            value={metrics.cpm}
            format="currency"
          />
          <MetricCard
            icon="cpc"
            label="Custo por Click (CPC)"
            value={metrics.cpc}
            format="currency"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
