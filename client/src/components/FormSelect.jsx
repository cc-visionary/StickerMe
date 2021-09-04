import React from 'react';

import '../assets/styles/components/FormSelect.css';

const FormSelect = ({
  title, onChange, options, error, placeholder, required, disabled,
}) => (
  <div id="special-form-select">
    <div className="label">
      {title}
      <span style={{ color: required ? '#EB8B35' : '#735840' }}> *</span>
    </div>
    <div>
      <select
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      >
        {options.map((o) => <option value={o}>{o}</option>)}
      </select>
      <p className="error" style={{ color: error ? '#FFBF74' : '#735840' }}>{error || '#'}</p>
    </div>
  </div>
);

export default FormSelect;
