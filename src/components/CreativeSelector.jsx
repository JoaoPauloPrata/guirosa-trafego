import React from 'react';

const CreativeSelector = ({ creatives, selectedCreative, onChange, disabled }) => {
  return (
    <div className="creative-selector">
      <h3 className="filter-title">Criativo</h3>
      <select
        id="creativeFilter"
        value={selectedCreative}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Todos os criativos</option>
        {creatives.map((creative) => (
          <option key={creative} value={creative}>
            {creative}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CreativeSelector; 