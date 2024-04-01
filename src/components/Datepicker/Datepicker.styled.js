import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { calendarSVG } from '../../assets';

export const InputWrapper = styled.div`
  padding: 12px;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ced5de;
  border-radius: 8px;
`;

export const DateInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  -webkit-appearance: none;
  opacity: 0;
`;

export const DateText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #1f2939;
`;

export const CalendarIcon = styled.img.attrs({ src: calendarSVG })`
  width: 16px;
  height: 16px;
`;
