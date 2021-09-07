import React from 'react';

import '../assets/styles/components/FormInput.css';

const FormInput = ({
  title, inputValue, onChange, error, placeholder, required, disabled,
}) => (
  <div id="special-form-input">
    <div className="label">
      {title}
      <span style={{ color: required ? '#EB8B35' : '#735840' }}> *</span>
    </div>
    <div>
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
      <p className="error" style={{ color: error ? '#FFBF74' : '#735840' }}>{error || '#'}</p>
    </div>
  </div>
);

export default FormInput;
