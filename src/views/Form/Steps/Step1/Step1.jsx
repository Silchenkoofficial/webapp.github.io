import { useEffect, useState } from 'react';
import { Card, FileInput, RadioGroup } from '../../../../components';
import { photosOptions } from '../../../../constants/radioOptions';
import { useStore } from '../../../../store/StoreContext';
import { StepWrapper } from '../../Form.styled';

export const Step1 = ({ visible }) => {
  const { state, setState } = useStore();

  const handleChange = (event) => {
    setState({
      ...state,
      photos: event.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      <Card>
        <Card.Title>Загрузите фото/видео начала работ</Card.Title>
        {state.photos !== 'mediaFiles' && (
          <RadioGroup
            name={'photos'}
            options={photosOptions}
            onChange={handleChange}
            selectedValue={state.photos}
          />
        )}
        <FileInput type={'photos'} />
      </Card>
    </StepWrapper>
  );
};
