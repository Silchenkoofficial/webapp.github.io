import {Card, FileInput, Slider} from '../../../../components';
import { Statuses } from '../../../../constants';
import {
  actsOptions,
  attachmentsOptions,
  photosOptions,
} from '../../../../constants/radioOptions';
import { useStore } from '../../../../store/StoreContext';
import { StepWrapper } from '../../Form.styled';
import { Text, StatusWrapper, StatusCircle } from './FinalStep.styled';

export const FinalStep = ({ visible }) => {
  const { state, setState } = useStore();

  return (
    <StepWrapper visible={visible}>
      <Text className="with-wrapper">
        Проверьте верно ли введена информация на&nbsp;предыдущих шагах
        и&nbsp;завершите работу с&nbsp;заявкой.
      </Text>
      <Card>
        <Card.Title>Фото/видео начала работ</Card.Title>
        {state.photos === 'mediaFiles' ? (
            <FileInput type={'photos'} onlySlider={true} />
        ) : (
          <Text>
            {photosOptions.find((el) => el.value === state.photos)?.label || ''}
          </Text>
        )}
      </Card>
      <Card>
        <Card.Title>Статус заявки и описание</Card.Title>
        <StatusWrapper status={state.status}>
          <StatusCircle status={state.status} />
          {Statuses.find((el) => el.value === state.status)?.label}
        </StatusWrapper>
        <Text>
          {state.status !== 'transfer'
            ? state.description
            : state.transferDate?.split('-').reverse().join('.') || ''}
        </Text>
      </Card>
      {state.status === 'delayed' && (
        <Card>
          <Card.Title>Дата переноса работ</Card.Title>
          <Text>
            {state.transferDate?.split('-').reverse().join('.') || ''}
          </Text>
        </Card>
      )}
      <Card>
        <Card.Title>Фото/видео выполненных работ</Card.Title>
        {state.attachments === 'mediaFiles' ? (
            <FileInput type={'attachments'} onlySlider={true} />
        ) : (
          <Text>
            {attachmentsOptions.find((el) => el.value === state.attachments)
              ?.label || ''}
          </Text>
        )}
      </Card>
      {state.status === 'performed' && (
        <Card>
          <Card.Title>Акт выполненных работ</Card.Title>
          {state.acts === 'mediaFiles' ? (
              <FileInput type={'acts'} onlySlider={true} />
          ) : (
            <Text>
              {actsOptions.find((el) => el.value === state.acts)?.label || ''}
            </Text>
          )}
        </Card>
      )}
    </StepWrapper>
  );
};
