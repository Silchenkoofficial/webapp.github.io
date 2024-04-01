import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  height: ${(props) => (props.visible ? 'auto' : '0')};
`;
