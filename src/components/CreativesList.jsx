import React from 'react';

const CreativesList = ({ data }) => {
  // Agrupa os dados por título do criativo
  const groupByCreative = data.reduce((acc, item) => {
    const creativeTitle = item['Título do Criativo'];
    if (!acc[creativeTitle]) {
      acc[creativeTitle] = {
        nome: creativeTitle,
        alcance: 0,
        clicks: 0,
        conversas: 0,
        impressoes: 0,
        investimento: 0,
        plataforma: item.Plataforma,
        posicionamento: item.Posicionamento,
        imagem: 'https://drive.google.com/uc?export=view&id=1_SEtTpFYVPKy97GOX9I3GHBWUxyZmk1l'
      };
    }

    // Soma as métricas para cada criativo
    acc[creativeTitle].alcance += Number(item.Alcance) || 0;
    acc[creativeTitle].clicks += Number(item['Clicks no Link']) || 0;
    acc[creativeTitle].conversas += Number(item['Conversas Iniciadas']) || 0;
    acc[creativeTitle].impressoes += Number(item['Impressões']) || 0;
    acc[creativeTitle].investimento += Number(item['Investimento']) || 0;

    return acc;
  }, {});

  const formatNumber = (value) => new Intl.NumberFormat('pt-BR').format(value);
  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  const calculateCTR = (clicks, impressoes) => {
    const ctr = impressoes > 0 ? (clicks / impressoes) * 100 : 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(ctr / 100);
  };

  return (
    <section className="criativos">
      <h2>Criativos:</h2>
      <div className="criativos-container">
        {Object.values(groupByCreative).map((criativo) => (
          <div key={criativo.nome} className="criativo-card">
            <div className="criativo-imagem">
              <img src={criativo.imagem} alt={criativo.nome} />
            </div>
            <div className="criativo-info">
              <h3>{criativo.nome}</h3>
              <div className="criativo-detalhes">
                <span className="plataforma">{criativo.plataforma}</span>
                <span className="posicionamento">{criativo.posicionamento}</span>
              </div>
              <div className="criativo-metricas">
                <div className="criativo-metrica">
                  <span>Alcance</span>
                  <strong>{formatNumber(criativo.alcance)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Impressões</span>
                  <strong>{formatNumber(criativo.impressoes)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Clicks</span>
                  <strong>{formatNumber(criativo.clicks)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>CTR</span>
                  <strong>{calculateCTR(criativo.clicks, criativo.impressoes)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Conversas</span>
                  <strong>{formatNumber(criativo.conversas)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Investimento</span>
                  <strong>{formatCurrency(criativo.investimento)}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreativesList; 