import { useState, useEffect } from 'react';
import { useStore } from '../../store/StoreContext';
import { Wrapper } from './Form.styled';
import { FinalStep, Step1, Step2, Step3 } from './Steps';

const Steps = [Step1, Step2, Step3, FinalStep];

export const Form = () => {
  const { state, setState } = useStore();

  return (
    <Wrapper currentStep={state.currentStep}>
      {Steps.map((Step, index) => (
        <Step key={index} visible={state.currentStep === index + 1} />
      ))}
    </Wrapper>
  );
};
