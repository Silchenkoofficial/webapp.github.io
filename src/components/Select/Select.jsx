import React, { useRef } from 'react';
import { Wrapper } from './Select.styled';

export const Select = ({
  options = [],
  selectedValue,
  onChange,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
}) => {
  const selectRef = useRef(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Wrapper
      status={selectedValue}
      onClick={() => {
        selectRef.current.focus();
      }}
    >
      {leftIcon}
      <select
        ref={selectRef}
        value={selectedValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {rightIcon}
    </Wrapper>
  );
};
