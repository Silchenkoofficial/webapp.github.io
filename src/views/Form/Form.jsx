import { useState, useEffect } from 'react';
import { useStore } from '../../store/StoreContext';
import { Wrapper } from './Form.styled';
import { FinalStep, Step1, Step2, Step3 } from './Steps';

const Steps = [Step1, Step2, Step3, FinalStep];

export const Form = () => {
  const { formData } = useStore();

  return (
    <Wrapper currentStep={formData.currentStep}>
      {Steps.map((Step, index) => (
        <Step key={index} visible={formData.currentStep === index + 1} />
      ))}
    </Wrapper>
  );
};
