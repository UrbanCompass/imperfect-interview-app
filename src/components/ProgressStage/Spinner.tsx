import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const spinnerAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${spinnerAnimation} 1.1s infinite linear;
  border: 2px solid var(--cx-color-actionableDisabled);
  border-left-color: var(--cx-color-interactive);
  border-radius: 50%;
  height: 15px;
  position: absolute;
  width: 15px;
`;

Spinner.displayName = 'Spinner';
