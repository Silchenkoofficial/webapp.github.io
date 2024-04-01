import styled from 'styled-components';

export const Fade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  opacity: 0.2;
  background-color: #000000;
  z-index: 1000;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 265px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 16px;
  color: #1f2a37;
  overflow: hidden;
  z-index: 1000;
`;

export const Title = styled.div`
  padding: 12px 8px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #0f1728;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e4e8ee;
`;

export const Button = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => (props.red ? '#E53E3E' : '#1F2939')};

  &:not(:last-child) {
    border-right: 1px solid #e4e8ee;
  }
`;

export const Body = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 8px 0 24px 0;
  text-align: left;
`;
