import styled from 'styled-components';
import { informationCircleSVG } from '../../../assets';

export const Wrapper = styled.div`
  padding: 24px 12px 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* box-shadow: 0 2px 5px #c6c6c6; */
  z-index: 10;
`;

export const HeaderContent = styled.div``;

export const HeaderText = styled.div`
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

export const HeaderSubtext = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #2d67d8;
  cursor: pointer;
`;

export const InfoIcon = styled.img.attrs({ src: informationCircleSVG })`
  width: 16px;
  height: 16px;
`;
