import { useState, useEffect } from 'react';
import { Card, Datepicker, Select } from '../../../../components';
import { useStore } from '../../../../store/StoreContext';
import { ArrowIcon, StatusCircle, Textarea, Wrapper } from './Step2.styled';
import { Statuses } from '../../../../constants';
import { StepWrapper } from '../../Form.styled';

export const Step2 = ({ visible }) => {
  const { formData, setFormData } = useStore();
  const [isSelectOpen, setIsSelectOpen] = useState();

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const handleChangeDescription = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      <Card>
        <Card.Title>Смените статус для продолжения работы</Card.Title>
        <Select
          options={Statuses}
          selectedValue={
            Statuses.find((el) => el.value === formData.status).value
          }
          onChange={handleSelectChange}
          onFocus={() => setIsSelectOpen(true)}
          onBlur={() => setIsSelectOpen(false)}
          leftIcon={<StatusCircle status={formData.status} />}
          rightIcon={
            <ArrowIcon status={formData.status} isSelectOpen={isSelectOpen} />
          }
        />
      </Card>
      {formData.status !== 'transfer' && (
        <Card>
          <Card.Title>
            {formData.status === 'delayed'
              ? 'Введите описание причины переноса'
              : 'Введите описание выполненных работ'}
          </Card.Title>
          <Textarea
            placeholder={'Введите описание'}
            onChange={handleChangeDescription}
            value={formData.description}
          ></Textarea>
        </Card>
      )}
      {['transfer'].includes(formData.status) && (
        <Card>
          <Card.Title>Укажите дату переноса</Card.Title>
          <Datepicker />
        </Card>
      )}
    </StepWrapper>
  );
};
