import React from 'react';
import styled from '@emotion/styled';

interface StepIndicatorProps {
  selectedStep: number;
}

const Container = styled.div`
  display: flex;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
`;
Container.displayName = 'Container';

interface StepProps {
  isActive: boolean;
}

const Step = styled.div<StepProps>`
  color: ${(props): string =>
    props.isActive ? 'var(--cx-color-textStrong)' : 'var(--cx-color-mediumLightNeutral)'};
  font-weight: var(--cx-font-weightMedium);
  margin: 0 20px;
  position: relative;

  &:before {
    content: '>';
    position: absolute;
    right: calc(100% + 17px);
  }

  &:first-of-type:before {
    content: none;
  }
`;

const STEPS = ['Select images', 'Customize', 'Download'];

export function StepIndicator({ selectedStep }: StepIndicatorProps): JSX.Element {
  return (
    <Container>
      {STEPS.map((step, index) => (
        <Step key={step} isActive={index < selectedStep}>
          {step}
        </Step>
      ))}
    </Container>
  );
}
