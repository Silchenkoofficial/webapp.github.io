import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  svg {
    circle {
      /* transition: stroke-dashoffset 0.5s; */
    }
  }
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  fill: #0f1728;
`;
