import styled from 'styled-components';
import { ReactComponent as chevroneSVG } from '../../../../assets/chevrone.svg';

const getStatusColor = (status) => {
  switch (status) {
    case 'run':
      return '#FABE24';
    case 'delayed':
      return '#9DA6B4';
    case 'performed':
      return '#4ADC7F';
    case 'abandonment':
      return '#FC8181';
    case 'refusal':
      return '#FC8181';
    case 'transfer':
      return '#495466';
    default:
      return '#FABE24';
  }
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

export const Textarea = styled.textarea`
  padding: 12px;
  width: 100%;
  height: 150px;
  border: 1px solid #ced5de;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 8px;
  resize: none;
`;

export const StatusCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => getStatusColor(props.status)};
  border-radius: 50%;
`;

export const ArrowIcon = styled(chevroneSVG)`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.isSelectOpen ? '-180deg' : '0')});

  path {
    fill: ${(props) => getStatusColor(props.status)};
  }
`;
