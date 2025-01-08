import React from 'react';

const CampaignSelector = ({ campaigns, selectedCampaign, onChange, disabled }) => {
  return (
    <div className="campaign-selector">
      <label htmlFor="campaignFilter">Filtrar por campanha:</label>
      <select
        id="campaignFilter"
        value={selectedCampaign}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Todas as campanhas</option>
        {campaigns.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CampaignSelector; 