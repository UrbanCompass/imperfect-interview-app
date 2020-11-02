import React from 'react';

import { SquareImage } from '@/components/common';
import { CARD_TYPE, TEXT_CARD_TYPES } from '@/constants';
import { Address, AgentInfo } from '@/types';

import { TextOverlay } from './TextOverlay';

interface CardPreviewProps {
  cardType: CARD_TYPE;
  imageUrl: string;
  address?: Address;
  text?: string;
  agentInfo?: AgentInfo;
  isMini?: boolean;
}

const DEFAULT_WIDTH = 500;
const MINI_WIDTH = 100;

export function CardPreview({
  cardType,
  imageUrl,
  address,
  text,
  agentInfo,
  isMini,
}: CardPreviewProps): JSX.Element {
  const width = isMini ? MINI_WIDTH : DEFAULT_WIDTH;
  const hasTextOverImage =
    (cardType === CARD_TYPE.IMAGE_WTIH_ADDRESS && (!!address?.title || !!address?.subtitle)) ||
    cardType === CARD_TYPE.IMAGE_WITH_CUSTOM_TEXT ||
    cardType === CARD_TYPE.IMAGE_WITH_SQFT;
  return (
    <div css={{ height: `${width}px`, margin: 'auto', width: `${width}px` }}>
      <SquareImage
        imageUrl={imageUrl}
        width={width}
        shouldDarken={hasTextOverImage}
        css={{ position: 'absolute' }}
      />
      {TEXT_CARD_TYPES.has(cardType) && (
        <TextOverlay
          type={cardType}
          address={address}
          text={text}
          agentInfo={agentInfo}
          isMini={isMini}
        />
      )}
    </div>
  );
}
