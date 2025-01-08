import React from 'react';

const CreativesList = ({ data }) => {
  // Agrupa os dados por criativo
  const groupByCreative = data.reduce((acc, item) => {
    if (!acc[item.Criativo]) {
      acc[item.Criativo] = {
        nome: item.Criativo,
        alcance: 0,
        clicks: 0,
        conversas: 0,
        impressoes: 0,
        investimento: 0,
        imagem: 'https://st3.depositphotos.com/1000128/12545/i/450/depositphotos_125457988-stock-photo-two-19-liter-or-5.jpg'
      };
    }

    acc[item.Criativo].alcance += Number(item.Alcance) || 0;
    acc[item.Criativo].clicks += Number(item['Clicks no Link']) || 0;
    acc[item.Criativo].conversas += Number(item['Conversas Iniciadas']) || 0;
    acc[item.Criativo].impressoes += Number(item['Impressões']) || 0;
    acc[item.Criativo].investimento += Number(item['Investimento']) || 0;

    return acc;
  }, {});

  const formatNumber = (value) => new Intl.NumberFormat('pt-BR').format(value);
  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

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
              <div className="criativo-metricas">
                <div className="criativo-metrica">
                  <span>Alcance</span>
                  <strong>{formatNumber(criativo.alcance)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Clicks</span>
                  <strong>{formatNumber(criativo.clicks)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Conversas</span>
                  <strong>{formatNumber(criativo.conversas)}</strong>
                </div>
                <div className="criativo-metrica">
                  <span>Impressões</span>
                  <strong>{formatNumber(criativo.impressoes)}</strong>
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