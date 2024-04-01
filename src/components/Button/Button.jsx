import { Wrapper } from './Button.styled';

export const Button = (props) => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};
