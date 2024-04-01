import styled from 'styled-components';

export const Wrapper = styled.div`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
