import styled from 'styled-components';

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: '#2D67D8',
        textColor: '#FFFFFF',
      };
    case 'secondary':
      return {
        backgroundColor: '#F2F5F8',
        textColor: '#1F2939',
      };
    default:
      return { backgroundColor: '#2d67d8', textColor: '#ffffff' };
  }
};

export const Wrapper = styled.div`
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(props) =>
    getVariantStyles(props.variant).backgroundColor};
  color: ${(props) => getVariantStyles(props.variant).textColor};
  opacity: ${(props) => (props.isDisabled ? '0.5' : '1')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition:
    height 0.2s linear,
    padding 0.2s linear,
    transform 0.2s linear;

  &.hidden {
    transform: scale(0);
    padding: 0;
    height: 0;
  }
`;
