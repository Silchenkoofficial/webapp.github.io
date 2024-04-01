import styled from 'styled-components';
import { addPhotoSVG } from '../../assets';
import { ReactComponent as trashSVG } from '../../assets/trash.svg';
import { ReactComponent as informationSVG } from '../../assets/information-circle.svg';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .slick-slider {
    height: 268px;

    &.fullscreen img {
      width: 100vw;
      height: 100vh;
    }

    & div {
      height: 100%;
    }
  }

  .slick-slide {
    position: relative !important;
  }

  .slick-slide:not(:last-child) {
    margin-right: 8px;
  }
  .slick-slide img {
    max-width: 80vw;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    outline: none;
  }
`;

export const InputWarning = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${(props) => (props.isError ? '#E53E3E' : '#697180')};
`;

export const AddPhotoIcon = styled.img.attrs({ src: addPhotoSVG })`
  width: 16px;
  height: 16px;
`;

export const DeleteButton = styled(trashSVG)`
  padding: 4px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #fff;
  z-index: 100;
`;

export const FullscreenWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;

  img {
    width: 100vw;
    object-fit: contain;
  }
`;

export const AlertIcon = styled(informationSVG)`
  min-width: 16px;
  min-height: 16px;
  max-width: 16px;
  max-height: 16px;

  & path {
    fill: #e53e3e;
  }
`;
