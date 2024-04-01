import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;
