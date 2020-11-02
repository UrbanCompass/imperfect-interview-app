import React from 'react';
import styled from '@emotion/styled';

import { Icon } from '@uc/cx.react';

import { Spinner } from './Spinner';

export enum ProgressState {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED,
}

interface ProgressStepProps {
  state: ProgressState;
  text: string;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 24px 0;
  text-align: left;
`;
Container.displayName = 'Container';

const Checkmark = styled.div`
  align-items: center;
  background-color: var(--cx-color-interactive);
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  width: 20px;
`;
Checkmark.displayName = 'Checkmark';

interface StepTextProps {
  disabled: boolean;
}

const StepText = styled.div<StepTextProps>`
  color: ${(props) =>
    props.disabled ? 'var(--cx-color-mediumLightNeutral)' : 'var(--cx-color-textStrong)'};
  font: ${(props) =>
    props.disabled ? 'ar(--cx-font-shorthandBody)' : 'var(--cx-font-shorthandBodyStrong)'};
  font-size: var(--cx-font-sizeLg);
  padding-left: 45px;
`;
StepText.displayName = 'StepText';

export function ProgressStep({ state, text }: ProgressStepProps) {
  return (
    <Container>
      {state === ProgressState.COMPLETED && (
        <Checkmark>
          <Icon.Checkmark css={{ fill: 'var(--cx-color-white)', width: '11px' }} />
        </Checkmark>
      )}
      {state === ProgressState.IN_PROGRESS && <Spinner />}
      <StepText disabled={state === ProgressState.NOT_STARTED}>{text}</StepText>
    </Container>
  );
}
