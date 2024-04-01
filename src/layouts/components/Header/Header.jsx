import {
  Wrapper,
  HeaderContent,
  HeaderText,
  HeaderSubtext,
  InfoIcon,
} from './Header.styled';
import { useStore } from '../../../store/StoreContext';
import { FormProgress } from './components';
import { useEffect, useMemo } from 'react';

export const Header = () => {
  const { state, setState, requestData } = useStore();

  const openRequestModal = () => {
    // if (requestData.object_id) {
    setState({
      ...state,
      isRequestModalOpen: true,
    });
    // }
  };

  return (
    <>
      <Wrapper>
        <HeaderContent>
          <HeaderText>Работа с заявкой </HeaderText>
          <HeaderSubtext onClick={openRequestModal}>
            <InfoIcon />
            Подробная информация о&nbsp;заявке
          </HeaderSubtext>
        </HeaderContent>
        <FormProgress value={state.percentage} />
      </Wrapper>
    </>
  );
};
