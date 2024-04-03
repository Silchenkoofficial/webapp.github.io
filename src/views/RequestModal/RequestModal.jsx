import {
  Wrapper,
  ModalHeader,
  ModalHeaderText,
  CloseIcon,
  ModalContent,
  ModalBody,
  Block,
  Title,
  Text,
  ContactWrapper,
  ContactDivider,
  PhoneText,
  PhoneIcon,
  SocialWrapper,
  SocialBlock,
  WhatsAppIcon,
  TelegramIcon,
  ViberIcon,
  EmptyPhotoWrapper,
} from './RequestModal.styled';
import { useStore } from '../../store/StoreContext';
import { Button, Slider } from '../../components';
import { formatPhone } from '../../utils';
import { changeSocial } from '../../http-requests';
import { emptyPhoto } from '../../assets';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SOCIALS = [
  {
    label: 'WhatsApp',
    field: 'wa',
    props: 'is_active_whatsapp',
    logo: <WhatsAppIcon />,
  },
  {
    label: 'Telegram',
    field: 'tg',
    props: 'is_active_telegram',
    logo: <TelegramIcon />,
  },
  {
    label: 'Viber',
    field: 'vb',
    props: 'is_active_viber',
    logo: <ViberIcon />,
  },
];

export const RequestModal = ({
  modalContentRef,
  isRequestModalOpen,
  setIsRequestModalOpen,
}) => {
  const { requestData, setRequestData } = useStore();
  const { pk } = useParams();

  const closeModal = () => {
    setIsRequestModalOpen(false);
  };

  const handleSocialButton = (requestProps, socialField) => {
    changeSocial({
      tenant: requestData.tenant_id,
      field: socialField,
      request: requestData.object_id,
    })
      .then((res) => {
        if (res.status === 'OK') {
          setRequestData((prevState) => ({
            ...prevState,
            [requestProps]: true,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper isOpen={isRequestModalOpen}>
      <ModalContent ref={modalContentRef}>
        <ModalHeader>
          <ModalHeaderText>Подробная информация о заявке</ModalHeaderText>
          <CloseIcon onClick={closeModal} />
        </ModalHeader>
        <ModalBody>
          <Block>
            <Title>Номер заявки</Title>
            <Text>{requestData.number}</Text>
          </Block>
          <Block>
            <Title>Адрес</Title>
            <Text>{requestData.address}</Text>
          </Block>
          <Block>
            <Title>Контактное лицо</Title>
            <ContactWrapper>
              <PhoneText
                href={
                  requestData.tenant_number &&
                  `tel:${requestData.tenant_number || ''}`
                }
              >
                <PhoneIcon />
                {formatPhone(requestData.tenant_number)}
              </PhoneText>
              <ContactDivider />
              <Text>{requestData.short_name}</Text>
            </ContactWrapper>
          </Block>
          {requestData.tenant_id && (
            <Block>
              <Title>Наличие иных способов связи</Title>
              <SocialWrapper>
                {SOCIALS.map((social) => (
                  <SocialBlock
                    key={social.props}
                    onClick={() =>
                      handleSocialButton(social.props, social.field)
                    }
                    isActive={requestData[social.props]}
                  >
                    {social.logo}
                    <Text>{social.label}</Text>
                  </SocialBlock>
                ))}
              </SocialWrapper>
            </Block>
          )}
          <Block>
            <Title>Описание заявки</Title>
            <Text className={'with-wrapper'}>{requestData.description}</Text>
          </Block>
          <Block>
            <Title>Фото от заявителя</Title>
            {requestData?.photos?.length > 0 ? (
              <Slider>
                {requestData?.photos?.map((photo) => (
                  <img
                    src={`${process.env.REACT_APP_BOT_URL}/media/photos_show/${photo}.jpg`}
                    alt=""
                  />
                ))}
              </Slider>
            ) : (
              <EmptyPhotoWrapper>
                <img src={emptyPhoto} alt="" />
                <p>Фото от заявителя отсутствуют </p>
              </EmptyPhotoWrapper>
            )}
          </Block>
          <Block>
            <Button>Построить маршрут</Button>
          </Block>
        </ModalBody>
      </ModalContent>
    </Wrapper>
  );
};
