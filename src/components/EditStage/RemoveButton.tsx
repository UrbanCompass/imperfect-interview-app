import React from 'react';
import styled from '@emotion/styled';

import { TrashIcon } from '@/components/common';

interface RemoveButtonProps {
  isVisible: boolean;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface IconWrapperProps {
  isVisible: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  align-items: center;
  display: flex;
  height: 36px;
  justify-content: center;
  margin: auto;
  width: 36px;
  visibility: ${(props): string => (props.isVisible ? 'visible' : 'hidden')};
  &:hover {
    background-color: var(--cx-color-dropShadow);
    border-radius: 50%;
    cursor: pointer;
  }
`;
IconWrapper.displayName = 'IconWrapper';

export function RemoveButton({ isVisible, handleClick }: RemoveButtonProps): JSX.Element {
  return (
    <IconWrapper onClick={handleClick} isVisible={isVisible}>
      <TrashIcon />
    </IconWrapper>
  );
}
