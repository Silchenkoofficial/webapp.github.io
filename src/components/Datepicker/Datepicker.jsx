import { useRef, useState } from 'react';
import {
  InputWrapper,
  DateInput,
  DateText,
  CalendarIcon,
} from './Datepicker.styled';
import { useStore } from '../../store/StoreContext';

export const Datepicker = () => {
  const { formData, setFormData } = useStore();
  const inputRef = useRef(null);

  const currentDate = new Date();
  const nextDayDate = new Date(currentDate);
  nextDayDate.setDate(currentDate.getDate() + 1);
  const nextDayString = nextDayDate.toISOString().split('T')[0];

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    setFormData({
      ...formData,
      transferDate:
        selectedDate < nextDayString ? nextDayString : e.target.value,
    });
  };

  return (
    <InputWrapper>
      <DateInput
        ref={inputRef}
        type="date"
        min={nextDayString}
        value={formData.transferDate}
        onChange={handleChange}
      />
      <DateText>
        {formData.transferDate?.split('-').reverse().join('.') ||
          'Выберите дату'}
      </DateText>
      <CalendarIcon />
    </InputWrapper>
  );
};
