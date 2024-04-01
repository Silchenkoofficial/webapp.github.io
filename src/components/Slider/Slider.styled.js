import styled from 'styled-components';
import { ReactComponent as trashSVG } from '../../assets/trash.svg';

export const SliderWrapper = styled.div`
  height: 268px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Slide = styled.div`
  flex-shrink: 0;
  position: relative;
  width: fit-content;
  max-width: 90%;
  height: 100%;
  display: flex;
  align-items: center;

  & > img,
  & > video {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }
`;

export const DeleteButton = styled.div`
  padding: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const TrashIcon = styled(trashSVG)`
  padding: 4px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 4px;
`;
