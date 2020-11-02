/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-param-reassign */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDrag, useDrop } from 'react-dnd-cjs';

import { EllipsisIcon } from '@/components/common';
import { NUM_IMAGES_REQUIRED } from '@/constants';
import { Address, AgentInfo, Media, Preferences, ProcessedListing } from '@/types';
import { getCardType, getInputValue, isAgentBrandingScreen, isCompassLogoScreen } from '@/utils';

import { CardPreview } from './CardPreview';
import { RemoveButton } from './RemoveButton';

interface DragObject {
  index: number;
  type: string;
  id: string;
}

interface ContainerProps {
  isDraggable: boolean;
  isSelected: boolean;
}

const Container = styled.div<ContainerProps>`
  background-color: ${(props): string =>
    props.isSelected ? 'var(--cx-color-coolDarkNeutral)' : 'initial'};
  border-bottom: 1px solid var(--cx-color-border);
  color: ${(props): string =>
    props.isSelected ? 'var(--cx-color-lightNeutral)' : 'var(--cx-color-mediumLightNeutral)'};
  fill: ${(props): string =>
    props.isSelected ? 'var(--cx-color-lightNeutral)' : 'var(--cx-color-innerShadow)'};
  display: flex;
  height: 130px;
  :hover {
    cursor: ${(props): string => (props.isDraggable ? 'pointer' : 'initial')};
  }
`;
Container.displayName = 'Container';

const OrderNumber = styled.div`
  height: 20px;
  left: -10px;
  margin: auto;
  position: relative;
  width: 64px;
`;
OrderNumber.displayName = 'OrderNumber';

const Placeholder = styled.div`
  background-color: var(--cx-color-lightNeutral);
  width: 100%;
`;
Placeholder.displayName = 'Placeholder';

const TYPE = 'CARD';

interface DraggableProps {
  index: number;
  imageUrl: string;
  listing: ProcessedListing;
  media: Array<Media>;
  preferences: Preferences;
  address?: Address;
  agentInfo?: AgentInfo;
  selectedIndex: number;
  handleClick: (index: number) => void;
  handleReorder?: (startIndex: number, endIndex: number) => void;
  handleRemove: (index: number) => void;
}

export function Draggable({
  index,
  imageUrl,
  listing,
  media,
  preferences,
  address,
  agentInfo,
  selectedIndex,
  handleClick,
  handleReorder,
  handleRemove,
}: DraggableProps): JSX.Element {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragObject, void, void>({
    accept: TYPE,
    // eslint-disable-next-line complexity
    hover(item, monitor): void {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      if (ref && ref.current) {
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) {
          return;
        }
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        if (handleReorder) {
          handleReorder(dragIndex, hoverIndex);

          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
        }
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: TYPE, index, id: imageUrl },
    collect: (monitor): Record<string, boolean> => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const isAgentBranding = isAgentBrandingScreen(media, index, preferences);
  const isCompassLogo = isCompassLogoScreen(media, index, preferences);
  const isDraggable = !isAgentBranding && !isCompassLogo;

  if (isDraggable) {
    drag(drop(ref));
  }

  return (
    <Container
      ref={ref}
      onClick={(): void => handleClick(index)}
      onMouseOver={(): void => setHover(true)}
      onMouseLeave={(): void => setHover(false)}
      isDraggable={isDraggable}
      isSelected={selectedIndex === index}
    >
      {isDragging ? (
        <Placeholder />
      ) : (
        <>
          <OrderNumber className="textIntent-caption2 textIntent-caption2--strong">
            {index + 1}
          </OrderNumber>
          {imageUrl && (
            <CardPreview
              cardType={getCardType(media, index, preferences)}
              imageUrl={imageUrl}
              address={address}
              text={getInputValue(listing, media, index)}
              agentInfo={agentInfo}
              isMini
            />
          )}
          <RemoveButton
            isVisible={
              hover && (isAgentBranding || isCompassLogo || media.length > NUM_IMAGES_REQUIRED)
            }
            handleClick={(event): void => {
              event.stopPropagation();
              handleRemove(index);
            }}
          />
          <EllipsisIcon css={{ margin: 'auto', visibility: isDraggable ? 'visible' : 'hidden' }} />
        </>
      )}
    </Container>
  );
}
