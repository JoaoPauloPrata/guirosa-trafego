import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchMetrics } from './services/api';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import DateSelector from './components/DateSelector';
import CampaignSelector from './components/CampaignSelector';
import CreativeSelector from './components/CreativeSelector';
import PlatformSelector from './components/PlatformSelector';
import Loading from './components/Loading';
import CreativesList from './components/CreativesList';

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
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [campaigns, setCampaigns] = useState([]);
  const [creatives, setCreatives] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedCreative, setSelectedCreative] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [dateRange]);

  useEffect(() => {
    if (rawData.length > 0) {
      const filteredData = filterData(rawData);
      calculateMetrics(filteredData);
    }
  }, [selectedCampaign, selectedCreative, selectedPlatform, rawData]);

  const filterData = (data) => {
    return data.filter(item => {
      const matchesCampaign = !selectedCampaign || item.Campanha === selectedCampaign;
      const matchesCreative = !selectedCreative || item['Título do Criativo'] === selectedCreative;
      const matchesPlatform = !selectedPlatform || item.Plataforma === selectedPlatform;
      return matchesCampaign && matchesCreative && matchesPlatform;
    });
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchMetrics(dateRange.startDate, dateRange.endDate);
      if (response.status === 'success') {
        setRawData(response.data);
        const uniqueCampaigns = [...new Set(response.data.map(item => item.Campanha))];
        const uniqueCreatives = [...new Set(response.data.map(item => item['Título do Criativo']))];
        const uniquePlatforms = [...new Set(response.data.map(item => item.Plataforma))];
        setCampaigns(uniqueCampaigns);
        setCreatives(uniqueCreatives);
        setPlatforms(uniquePlatforms);
        calculateMetrics(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
    setSelectedCampaign('');
    setSelectedCreative('');
    setSelectedPlatform('');
  };

  const handleCampaignChange = (campaign) => {
    setSelectedCampaign(campaign);
    setSelectedCreative('');
    setSelectedPlatform('');
  };

  const handleCreativeChange = (creative) => {
    setSelectedCreative(creative);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
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
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? '×' : '☰'}
      </button>
      <main>
        <div className={`filters ${isSidebarOpen ? 'open' : ''}`}>
          <DateSelector 
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateChange}
            disabled={isLoading}
          />
          <CampaignSelector
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            onChange={handleCampaignChange}
            disabled={isLoading}
          />
          <CreativeSelector
            creatives={creatives}
            selectedCreative={selectedCreative}
            onChange={handleCreativeChange}
            disabled={isLoading}
          />
          <PlatformSelector
            platforms={platforms}
            selectedPlatform={selectedPlatform}
            onChange={handlePlatformChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="content-area">
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

          <CreativesList 
            data={selectedCampaign 
              ? rawData.filter(item => item.Campanha === selectedCampaign) 
              : rawData
            } 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
