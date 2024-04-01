import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioLabel = styled.label`
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border-radius: 50%;
    border: 1.5px solid #9da6b4;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #2d67d8;
    transition: transform 0.2s ease-in-out;
  }

  input:checked ~ .checkmark {
    border: 1.5px solid #2d67d8;
  }

  input:checked ~ .checkmark:after {
    display: block;
    transform: translate(-50%, -50%) scale(1);
  }
`;
