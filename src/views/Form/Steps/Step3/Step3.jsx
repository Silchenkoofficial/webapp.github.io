import {
  Card,
  Datepicker,
  FileInput,
  RadioGroup,
} from '../../../../components';
import {
  attachmentsOptions,
  actsOptions,
} from '../../../../constants/radioOptions';
import { useStore } from '../../../../store/StoreContext';
import { StepWrapper } from '../../Form.styled';

export const Step3 = ({ visible }) => {
  const { formData, setFormData } = useStore();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      {['delayed'].includes(formData.status) && (
        <Card>
          <Card.Title>Укажите дату переноса</Card.Title>
          <Datepicker />
        </Card>
      )}
      <Card>
        <Card.Title>Загрузите фото/видео выполненных работ</Card.Title>
        {formData.attachments !== 'mediaFiles' && (
          <RadioGroup
            name={'attachments'}
            options={attachmentsOptions}
            onChange={handleChange}
            selectedValue={formData.attachments}
          />
        )}
        <FileInput type={'attachments'} />
      </Card>
      {formData.status === 'performed' && (
        <Card>
          <Card.Title>Загрузите акт выполненных работ</Card.Title>
          {formData.acts !== 'mediaFiles' && (
            <RadioGroup
              name={'acts'}
              options={actsOptions}
              onChange={handleChange}
              selectedValue={formData.acts}
            />
          )}
          <FileInput type={'acts'} />
        </Card>
      )}
    </StepWrapper>
  );
};
