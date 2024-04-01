import { memo, useEffect, useState } from 'react';
import { ProgressText, Wrapper } from './FormProgress.styled';
import { useStore } from '../../../../../store/StoreContext';

export const FormProgress = ({ value }) => {
  const [currVal, setCurrVal] = useState(0);

  useEffect(() => {
    if (value < currVal) {
      currVal !== value && setTimeout(setCurrVal, 15, currVal - 1);
    } else {
      currVal !== value && setTimeout(setCurrVal, 15, currVal + 1);
    }
  }, [currVal, value]);

  return (
    <Wrapper>
      <svg
        width="72"
        height="72"
        viewBox="-25 -25 250 250"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#E0EEFF"
          strokeWidth="32px"
          strokeDasharray="565.48px"
          strokeDashoffset="0"
        ></circle>
        <circle
          r="90"
          cx="100"
          cy="100"
          stroke="#2D67D8"
          strokeWidth="32px"
          strokeLinecap="round"
          strokeDashoffset={`${(565.48 * (100 - currVal)) / 100}px`}
          fill="transparent"
          strokeDasharray="565.48px"
        ></circle>
      </svg>
      <ProgressText>{currVal}%</ProgressText>
    </Wrapper>
  );
};
