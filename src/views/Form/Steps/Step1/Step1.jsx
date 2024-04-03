import { useEffect, useState } from 'react';
import { Card, FileInput, RadioGroup } from '../../../../components';
import { photosOptions } from '../../../../constants/radioOptions';
import { useStore } from '../../../../store/StoreContext';
import { StepWrapper } from '../../Form.styled';

export const Step1 = ({ visible }) => {
  const { formData, setFormData } = useStore();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      photos: event.target.value,
    });
  };

  return (
    <StepWrapper visible={visible}>
      <Card>
        <Card.Title>Загрузите фото/видео начала работ</Card.Title>
        {formData.photos !== 'mediaFiles' && (
          <RadioGroup
            name={'photos'}
            options={photosOptions}
            onChange={handleChange}
            selectedValue={formData.photos}
          />
        )}
        <FileInput type={'photos'} />
      </Card>
    </StepWrapper>
  );
};
