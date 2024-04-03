import { Card, FileInput, Slider } from '../../../../components';
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
  const { formData, setFormData } = useStore();

  return (
    <StepWrapper visible={visible}>
      <Text className="with-wrapper">
        Проверьте верно ли введена информация на&nbsp;предыдущих шагах
        и&nbsp;завершите работу с&nbsp;заявкой.
      </Text>
      <Card>
        <Card.Title>Фото/видео начала работ</Card.Title>
        {formData.photos === 'mediaFiles' ? (
          <FileInput type={'photos'} onlySlider={true} />
        ) : (
          <Text>
            {photosOptions.find((el) => el.value === formData.photos)?.label ||
              ''}
          </Text>
        )}
      </Card>
      <Card>
        <Card.Title>Статус заявки и описание</Card.Title>
        <StatusWrapper status={formData.status}>
          <StatusCircle status={formData.status} />
          {Statuses.find((el) => el.value === formData.status)?.label}
        </StatusWrapper>
        <Text>
          {formData.status !== 'transfer'
            ? formData.description
            : formData.transferDate?.split('-').reverse().join('.') || ''}
        </Text>
      </Card>
      {formData.status === 'delayed' && (
        <Card>
          <Card.Title>Дата переноса работ</Card.Title>
          <Text>
            {formData.transferDate?.split('-').reverse().join('.') || ''}
          </Text>
        </Card>
      )}
      <Card>
        <Card.Title>Фото/видео выполненных работ</Card.Title>
        {formData.attachments === 'mediaFiles' ? (
          <FileInput type={'attachments'} onlySlider={true} />
        ) : (
          <Text>
            {attachmentsOptions.find((el) => el.value === formData.attachments)
              ?.label || ''}
          </Text>
        )}
      </Card>
      {formData.status === 'performed' && (
        <Card>
          <Card.Title>Акт выполненных работ</Card.Title>
          {formData.acts === 'mediaFiles' ? (
            <FileInput type={'acts'} onlySlider={true} />
          ) : (
            <Text>
              {actsOptions.find((el) => el.value === formData.acts)?.label ||
                ''}
            </Text>
          )}
        </Card>
      )}
    </StepWrapper>
  );
};
