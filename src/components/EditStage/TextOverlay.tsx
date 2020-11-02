import React from 'react';
import styled from '@emotion/styled';

import { SQUARE_FOOTAGE_SUFFIX, CARD_TYPE, MAX_TEXT_LENGTH } from '@/constants';
import { Address, AgentInfo } from '@/types';
import { formatAddressTitle, formatTextWithLineBreak } from '@/utils';

interface TextOverlayProps {
  type: CARD_TYPE;
  address?: Address;
  text?: string;
  agentInfo?: AgentInfo;
  isMini?: boolean;
}

interface SizeProps {
  isMini?: boolean;
}

const BigText = styled.div<SizeProps>`
  font-size: ${(props): string => (props.isMini ? '24px' : '120px')};
  line-height: ${(props): string => (props.isMini ? '26px' : '130px')};
`;
BigText.displayName = 'BigText';

const SmallText = styled.div<SizeProps>`
  font-weight: normal;
  font-size: ${(props): string => (props.isMini ? '5px' : '24px')};
  line-height: ${(props): string => (props.isMini ? '10px' : '48px')};
`;
SmallText.displayName = 'SmallText';

const TinyText = styled.div<SizeProps>`
  font-weight: normal;
  font-size: ${(props): string => (props.isMini ? '4px' : '19px')};
  line-height: ${(props): string => (props.isMini ? '6px' : '28px')};
`;
TinyText.displayName = 'TinyText';

const BoxedText = styled.div<SizeProps>`
  background-color: var(--cx-color-white);
  color: var(--cx-color-black);
  font-size: ${(props): string => (props.isMini ? '5px' : '24px')};
  font-weight: normal;
  line-height: ${(props): string => (props.isMini ? '10px' : '48px')};
  margin: ${(props): string => (props.isMini ? '2px' : '10px')} auto 0;
  padding: 0 ${(props): string => (props.isMini ? '2px' : '10px')};
  width: fit-content;
`;
BoxedText.displayName = 'BoxedText';

const SerifText = styled.div<SizeProps>`
  font-family: var(--font-familySerif, 'Compass Serif', Times, 'Times New Roman', serif);
  font-size: ${(props): string => (props.isMini ? '6px' : '28px')};
  line-height: ${(props): string => (props.isMini ? '8px' : '40px')};
  margin: ${(props): string => (props.isMini ? '2px 0 1px' : '10px 0 5px')};
  max-height: ${(props): string => (props.isMini ? '16px' : '80px')};
  overflow: hidden;
  white-space: normal;
`;
SerifText.displayName = 'SerifText';

const AvatarImage = styled.img<SizeProps>`
  height: ${(props): string => (props.isMini ? '30px' : '150px')};
  left: ${(props): string => (props.isMini ? '8px' : '40px')};
  position: absolute;
  top: ${(props): string => (props.isMini ? '8px' : '40px')};
`;
AvatarImage.displayName = 'AvatarImage';

const AgentLogo = styled.img<SizeProps>`
  filter: invert(100%);
  height: ${(props): string => (props.isMini ? '20px' : '100px')};
  position: absolute;
  right: ${(props): string => (props.isMini ? '6px' : '30px')};
  top: ${(props): string => (props.isMini ? '6px' : '30px')};
`;
AgentLogo.displayName = 'AgentLogo';

const AgentInfoContainer = styled.div<SizeProps>`
  left: ${(props): string => (props.isMini ? '8px' : '40px')};
  position: absolute;
  text-align: left;
  top: ${(props): string => (props.isMini ? '42px' : '210px')};
`;
AgentInfoContainer.displayName = 'AgentInfoContainer';

const Container = styled.div<SizeProps>`
  align-items: center;
  background-color: rgba(1, 1, 1, 0.3);
  color: var(--cx-color-white);
  display: flex;
  font-family: var(--font-familySans, 'Compass Sans', Helvetica, Arial, sans-serif);
  font-size: ${(props): string => (props.isMini ? '12px' : '60px')};
  font-weight: var(--font-weightSemiBold, 600);
  flex-direction: column;
  height: ${(props): string => (props.isMini ? '100px' : '500px')};
  line-height: ${(props): string => (props.isMini ? '16px' : '80px')};
  justify-content: center;
  mix-blend-mode: screen;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: ${(props): string => (props.isMini ? '100px' : '500px')};
  white-space: pre;
`;
Container.displayName = 'Container';

export function TextOverlay({
  type,
  address,
  text,
  agentInfo,
  isMini,
}: TextOverlayProps): JSX.Element {
  return (
    <Container isMini={isMini}>
      {type === CARD_TYPE.IMAGE_WTIH_ADDRESS && address && (
        <div
          css={{ display: 'flex', flexDirection: 'column', paddingTop: isMini ? '6px' : '30px' }}
        >
          <div css={{ minHeight: isMini ? '16px' : '80px' }}>{formatAddressTitle(address)}</div>
          <BoxedText isMini={isMini}>{address.subtitle}</BoxedText>
        </div>
      )}
      {type === CARD_TYPE.IMAGE_WITH_SQFT && !!text && (
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <BigText isMini={isMini}>
            {text.slice(0, text.indexOf(SQUARE_FOOTAGE_SUFFIX) - 1)}
          </BigText>
          <SmallText isMini={isMini}>{SQUARE_FOOTAGE_SUFFIX}</SmallText>
        </div>
      )}
      {type === CARD_TYPE.IMAGE_WITH_CUSTOM_TEXT && !!text && (
        <div css={{ paddingTop: isMini ? '6px' : '30px' }}>
          {formatTextWithLineBreak(text, MAX_TEXT_LENGTH)}
        </div>
      )}
      {type === CARD_TYPE.AGENT_BRANDING && agentInfo && (
        <>
          {!!agentInfo?.agentAvatarUrl && (
            <AvatarImage isMini={isMini} src={agentInfo?.agentAvatarUrl} />
          )}
          {!!agentInfo?.agentLogoUrl && <AgentLogo isMini={isMini} src={agentInfo?.agentLogoUrl} />}
          <AgentInfoContainer isMini={isMini}>
            <SerifText isMini={isMini}>{agentInfo.name}</SerifText>
            <TinyText isMini={isMini}>{agentInfo.details}</TinyText>
          </AgentInfoContainer>
        </>
      )}
    </Container>
  );
}
