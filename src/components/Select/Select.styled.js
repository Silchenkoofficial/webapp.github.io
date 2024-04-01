import styled from 'styled-components';
import { getStatusColor } from '../../utils';

export const Wrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  background-color: ${(props) => getStatusColor(props.status).backgroundColor};
  border: 1px solid ${(props) => getStatusColor(props.status).borderColor};
  border-radius: 8px;

  & select {
    height: 100%;
    flex: 1;
    position: relative;
    box-sizing: border-box;
    border: none;
    background-color: transparent;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    color: #1f2939 !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;
