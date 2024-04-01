import { Button } from '../../../components';
import { Wrapper } from './Footer.styled';
import { useStore } from '../../../store/StoreContext';
import { useMemo } from 'react';
import {clearIndexedDB} from "../../../store/IndexedDBService";

export const Footer = () => {
  const { state, setState } = useStore();

  const nextButtonDisabled = () => {
    switch (state.currentStep) {
      case 1:
        return state.photos === '';
      case 2:
        if (state.status === 'transfer') {
          return state.transferDate === '';
        }
        return state.status === 'run' || state.description.length < 3;
      case 3:
        if (state.status === 'performed') {
          return (
            state.attachments === '' ||
            state.acts === ''
          );
        } else if (state.status === 'delayed') {
          return state.attachments === '' || state.transferDate === '';
        }
        return state.attachments === '';
      case 4:
        return false;
      default:
        return true;
    }
  };

  const nextButtonText = () => {
    switch (state.currentStep) {
      case 1:
      case 2:
        return 'Следующий шаг';
      case 3:
        return 'Перейти к завершению работы';
      case 4:
        return 'Завершить работу';
      default:
        return 'Следующий шаг';
    }
  };

  const nextStep = () => {
    if (state.currentStep > 3) {
      alert(1);
      localStorage.clear();
      clearIndexedDB();
    } else {
      setState({
        ...state,
        currentStep: state.currentStep + 1,
      });
    }
  };

  const prevStep = () => {
    setState({
      ...state,
      currentStep: state.currentStep - 1,
    });
  };

  return (
    <Wrapper>
      <Button
        isDisabled={nextButtonDisabled()}
        variant={'primary'}
        onClick={nextStep}
      >
        {nextButtonText()}
      </Button>
      <Button
        variant={'secondary'}
        onClick={prevStep}
        className={state.currentStep === 1 && 'hidden'}
      >
        Назад
      </Button>
    </Wrapper>
  );
};
