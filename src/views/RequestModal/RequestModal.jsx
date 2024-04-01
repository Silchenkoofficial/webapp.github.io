import { useEffect, useRef, useState } from 'react';
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
  ModalDrag,
  RequestPhotos,
} from './RequestModal.styled';
import { useStore } from '../../store/StoreContext';
import { Button, FileInput, Slider } from '../../components';

export const RequestModal = ({ modalContentRef }) => {
  const { state, setState, requestData } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  useEffect(() => {}, []);

  const closeModal = () => {
    setState({
      ...state,
      isRequestModalOpen: false,
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartTime(new Date());
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const newDeltaY = startY - e.touches[0].clientY;
      setDeltaY(newDeltaY);
      modalContentRef.current.style.transform = `translateY(${-newDeltaY * 0.99}px)`;
      modalContentRef.current.style.transition = `none`;
    }
  };

  const handleTouchEnd = () => {
    const endTime = new Date();
    const timeDiff = endTime - startTime;

    modalContentRef.current.style.transition = `transform 0.2s linear`;
    if (deltaY <= -150 || timeDiff < 300) {
      closeModal();
    }
    modalContentRef.current.style.transform = `translateY(0px)`;
    setIsDragging(false);
    setStartTime(0);
  };

  return (
    <Wrapper isOpen={state.isRequestModalOpen}>
      <ModalContent ref={modalContentRef}>
        <ModalHeader
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ModalDrag />
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
            <Text>Иванов Иван Иванович</Text>
          </Block>
          <Block>
            <Title>Наличие иных способов связи</Title>
            <Text>7810511603110</Text>
          </Block>
          <Block>
            <Title>Описание заявки</Title>
            <Text className={'with-wrapper'}>{requestData.description}</Text>
          </Block>
          <Block>
            <Title>Фото от заявителя</Title>
            <Slider>
              {requestData?.photos?.map((photo) => (
                <img
                  src={`${process.env.REACT_APP_BOT_URL}/media/photos_show/${photo}.jpg`}
                  alt=""
                />
              ))}
            </Slider>
          </Block>
          <Block>
            <Button>Построить маршрут</Button>
          </Block>
        </ModalBody>
      </ModalContent>
    </Wrapper>
  );
};
