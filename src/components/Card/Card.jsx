import { Wrapper, CardTitle } from './Card.styled';

export const Card = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Card.Title = ({ children }) => {
  return <CardTitle>{children}</CardTitle>;
};
