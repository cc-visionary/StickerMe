import React from 'react';

import '../assets/styles/components/SpecialInput.css';

const SpecialInput = ({
  type, name, placeholder, value, onChange, required, onKeyPress,
}) => (
  <input
    className="special-input"
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyPress={(e) => onKeyPress(e)}
    name={name}
    placeholder={placeholder}
    required={required}
  />
);

export default SpecialInput;
