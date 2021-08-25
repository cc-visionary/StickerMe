import React from 'react';

import '../assets/styles/components/SpecialInput.css';

const SpecialInput = ({
  type, name, placeholder, value, onChange, onKeyPress,
}) => (
  <input
    id="special-input"
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyPress={(e) => onKeyPress(e)}
    name={name}
    placeholder={placeholder}
  />
);

export default SpecialInput;
