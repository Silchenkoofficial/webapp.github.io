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
} from './RequestModal.styled';
import { useStore } from '../../store/StoreContext';
import { Button, Slider } from '../../components';

export const RequestModal = ({ modalContentRef }) => {
  const { state, setState, requestData } = useStore();

  const closeModal = () => {
    setState({
      ...state,
      isRequestModalOpen: false,
    });
  };

  return (
    <Wrapper isOpen={state.isRequestModalOpen}>
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
