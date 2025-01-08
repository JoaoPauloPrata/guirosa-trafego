import React from 'react';
// Importando as imagens
import alcanceIcon from '../assets/alcance.png';
import clickIcon from '../assets/click.png';
import conversasIcon from '../assets/conversas.png';
import custoconversaIcon from '../assets/custoporconversa.png';
import impressoesIcon from '../assets/impressoes.png';
import investimentoIcon from '../assets/investimento.png';
import ctrIcon from '../assets/ctr.png';
import cpmIcon from '../assets/cpm.png';
import cpcIcon from '../assets/cpc.png';

const formatters = {
  number: (value) => new Intl.NumberFormat('pt-BR').format(value),
  currency: (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value),
  percent: (value) => new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100)
};

const iconMap = {
  alcance: alcanceIcon,
  clicks: clickIcon,
  conversas: conversasIcon,
  custoconversa: custoconversaIcon,
  impressoes: impressoesIcon,
  investimento: investimentoIcon,
  ctr: ctrIcon,
  cpm: cpmIcon,
  cpc: cpcIcon
};

const MetricCard = ({ icon, label, value, format = 'number' }) => {
  return (
    <div className="metric-item">
      <div className="metric-icon">
        <img 
          src={iconMap[icon]} 
          alt={label}
          width="24"
          height="24"
        />
      </div>
      <div className="metric-content">
        <span className="metric-label">{label}</span>
        <strong className="metric-value">
          {formatters[format](value)}
        </strong>
      </div>
    </div>
  );
};

export default MetricCard; 