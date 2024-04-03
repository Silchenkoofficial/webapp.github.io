import styled from 'styled-components';
import {
  closeSVG,
  phoneSVG,
  telegramSVG,
  viberSVG,
  whatsappSVG,
} from '../../assets';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transform: translateY(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.2s linear;
`;

export const ModalContent = styled.div`
  position: relative;
  margin-top: auto;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow:
    0 4px 8px 0 #0f17280a,
    0 12px 18px 0 #0f17281f,
    0 0 10px 6px #0f17280a;
`;

export const ModalHeader = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

export const ModalBody = styled.div`
  padding: 0 24px 24px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: scroll !important;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const Title = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #697180;
`;
export const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #0f1728;

  &.with-wrapper {
    padding: 12px;
    border-radius: 8px;
    background-color: #eef5fe;
  }
`;

export const ModalHeaderText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #0f1728;
`;

export const CloseIcon = styled.img.attrs({ src: closeSVG })`
  width: 24px;
  height: 24px;
`;

export const ContactWrapper = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eef5fe;
  border-radius: 8px;

  & > div {
    flex: 1;
    text-align: center;
  }
`;

export const PhoneText = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #2d67d8 !important;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #2d67d8 !important;
  }
`;

export const PhoneIcon = styled.img.attrs({ src: phoneSVG })`
  width: 16px;
  height: 16px;
`;

export const ContactDivider = styled.span`
  display: block;
  width: 2px;
  height: 100%;
  background-color: #fff;
`;

export const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;
export const SocialBlock = styled.div`
  flex: 1;
  padding: 10px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? '#eef5fe' : '#F8F9FA')};
  pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  img {
    filter: grayscale(${(props) => (props.isActive ? '0' : '100')}%);
  }

  & > * {
    pointer-events: none;
  }
`;

export const WhatsAppIcon = styled.img.attrs({ src: whatsappSVG })``;
export const TelegramIcon = styled.img.attrs({ src: telegramSVG })``;
export const ViberIcon = styled.img.attrs({ src: viberSVG })``;

export const EmptyPhotoWrapper = styled.div`
  height: 268px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  & p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #697180;
  }
`;
