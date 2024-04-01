import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  transition:
    filter 0.2s linear,
    opacity 0.2s linear;
  filter: blur(${(props) => (props.isRequestModalOpen ? '4px' : '0')});
  opacity: ${(props) => (props.isRequestModalOpen ? '0.1' : '1')};
`;
