import usePortal from 'react-useportal';
import {
  Title,
  Body,
  ButtonGroup,
  Fade,
  Wrapper,
  Button,
} from './ConfirmModal.styled';

export const ConfirmModal = ({
  title,
  type,
  confirmText,
  dismissText,
  onConfirm,
  onDismiss,
}) => {
  const { Portal } = usePortal();

  return (
    <Portal>
      <Fade onClick={onDismiss} />
      <Wrapper>
        <Title>{title}</Title>
        <ButtonGroup $isAlert={type === 'alert'}>
          {type === 'confirm' && (
            <Button onClick={onDismiss}>{dismissText}</Button>
          )}
          <Button onClick={onConfirm} red={true}>
            {confirmText}
          </Button>
        </ButtonGroup>
      </Wrapper>
    </Portal>
  );
};
