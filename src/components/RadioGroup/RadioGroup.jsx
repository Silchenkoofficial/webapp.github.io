import { RadioLabel, Wrapper } from './RadioGroup.styled';

export const RadioGroup = ({ options = [], name, selectedValue, onChange }) => {
  return (
    <Wrapper>
      {options?.map((option) => (
        <RadioGroup.button
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
          name={name}
        />
      ))}
    </Wrapper>
  );
};

RadioGroup.button = ({ label, value, checked, onChange, name }) => {
  return (
    <RadioLabel>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <span className={'checkmark'}></span>
      {label}
    </RadioLabel>
  );
};
