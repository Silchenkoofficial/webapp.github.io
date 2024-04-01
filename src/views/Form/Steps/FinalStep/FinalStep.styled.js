import styled from 'styled-components';
import { getStatusColor } from '../../../../utils';

export const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #0f1728;

  &.with-wrapper {
    padding: 24px 12px;
    background-color: #e0eeff;
    border-radius: 12px;
    font-weight: 600;
  }
`;

export const StatusWrapper = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${(props) => getStatusColor(props.status).backgroundColor};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #1f2939;
  border-radius: 8px;
  border: 1px solid ${(props) => getStatusColor(props.status).borderColor};
`;

export const StatusCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => getStatusColor(props.status).borderColor};
  border-radius: 50%;
`;
