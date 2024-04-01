import { useState, useEffect } from 'react';
import { Card, Datepicker, Select } from '../../../../components';
import { useStore } from '../../../../store/StoreContext';
import { ArrowIcon, StatusCircle, Textarea, Wrapper } from './Step2.styled';
import { Statuses } from '../../../../constants';
import { StepWrapper } from '../../Form.styled';

export const Step2 = ({ visible }) => {
  const { state, setState } = useStore();
  const [isSelectOpen, setIsSelectOpen] = useState();

  const handleSelectChange = (value) => {
    console.log(value);
    setState({
      ...state,
      status: value,
    });
  };

  const handleChangeDescription = (e) => {
    e.preventDefault();
    setState({
      ...state,
      description: e.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      <Card>
        <Card.Title>Смените статус для продолжения работы</Card.Title>
        <Select
          options={Statuses}
          selectedValue={Statuses.find((el) => el.value === state.status).value}
          onChange={handleSelectChange}
          onFocus={() => setIsSelectOpen(true)}
          onBlur={() => setIsSelectOpen(false)}
          leftIcon={<StatusCircle status={state.status} />}
          rightIcon={
            <ArrowIcon status={state.status} isSelectOpen={isSelectOpen} />
          }
        />
      </Card>
      {state.status !== 'transfer' && (
        <Card>
          <Card.Title>
            {state.status === 'delayed'
              ? 'Введите описание причины переноса'
              : 'Введите описание выполненных работ'}
          </Card.Title>
          <Textarea
            placeholder={'Введите описание'}
            onChange={handleChangeDescription}
            value={state.description}
          ></Textarea>
        </Card>
      )}
      {['transfer'].includes(state.status) && (
        <Card>
          <Card.Title>Укажите дату переноса</Card.Title>
          <Datepicker />
        </Card>
      )}
    </StepWrapper>
  );
};
