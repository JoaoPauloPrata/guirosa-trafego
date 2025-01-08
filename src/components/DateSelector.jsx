import React from 'react';

const DateSelector = ({ startDate, endDate, onChange, disabled }) => {
  return (
    <div className="date-selector">
      <div className="date-field">
        <label htmlFor="startDate">Data inicial:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="date-field">
        <label htmlFor="endDate">Data final:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
          disabled={disabled}
          min={startDate}
        />
      </div>
    </div>
  );
};

export default DateSelector; 