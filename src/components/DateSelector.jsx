import React from 'react';

const DateSelector = ({ value, onChange, disabled }) => {
  return (
    <div className="date-selector">
      <label htmlFor="dateFilter">Filtrar por data:</label>
      <input
        id="dateFilter"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default DateSelector; 