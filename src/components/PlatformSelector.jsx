import React from 'react';

const PlatformSelector = ({ platforms, selectedPlatform, onChange, disabled }) => {
  return (
    <div className="creative-selector">
      <h3 className="filter-title">Plataforma</h3>
      <select
        id="platformFilter"
        value={selectedPlatform}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Todas as plataformas</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformSelector; 