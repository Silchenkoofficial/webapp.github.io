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
import { Wrapper } from './Step3.styled';

export const Step3 = ({ visible }) => {
  const { state, setState } = useStore();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      {['delayed'].includes(state.status) && (
        <Card>
          <Card.Title>Укажите дату переноса</Card.Title>
          <Datepicker />
        </Card>
      )}
      <Card>
        <Card.Title>Загрузите фото/видео выполненных работ</Card.Title>
        {state.attachments !== 'mediaFiles' && (
          <RadioGroup
            name={'attachments'}
            options={attachmentsOptions}
            onChange={handleChange}
            selectedValue={state.attachments}
          />
        )}
        <FileInput type={'attachments'} />
      </Card>
      {state.status === 'performed' && (
        <Card>
          <Card.Title>Загрузите акт выполненных работ</Card.Title>
          {state.acts !== 'mediaFiles' && (
            <RadioGroup
              name={'acts'}
              options={actsOptions}
              onChange={handleChange}
              selectedValue={state.acts}
            />
          )}
          <FileInput type={'acts'} />
        </Card>
      )}
    </StepWrapper>
  );
};
