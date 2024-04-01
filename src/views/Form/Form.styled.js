import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  gap: 24px;
  transform: translateX(${(props) => -(props.currentStep - 1) * 100}vw);
  transition: transform 0.3s ease-in;

  & > div {
    width: 100%;
    flex-shrink: 0;
  }
`;

export const StepWrapper = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'flex')};
  flex-direction: column;
  gap: 12px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  height: ${(props) => (props.visible ? 'fir-content' : '0')};
`;
