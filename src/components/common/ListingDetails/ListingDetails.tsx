import React from 'react';
import styled from '@emotion/styled';
import formatAddress from '@uc/format-listing-address';
import { formatBathsWithPluralizedLabel, getBathrooms } from '@uc/format-listing-baths';
import { formatBedroomsWithPluralizedLabel } from '@uc/format-listing-bedrooms';
import { formatSquareFeet } from '@uc/format-listing-size';

import { Separator } from '@/components/common';
import { ProcessedListing } from '@/types';

interface ListingDetailsProps {
  listing: ProcessedListing;
}

export const Address = styled.div`
  margin: 8px 0;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 64px;
  line-height: 32px;
  position: fixed;
  right: 40px;
  top: 0;
  z-index: 1000;
`;
Container.displayName = 'Container';

export function ListingDetails({ listing }: ListingDetailsProps): JSX.Element {
  const address = formatAddress(listing);
  const bedrooms = formatBedroomsWithPluralizedLabel(listing, 'Bed' /* suffix */) || '- Beds';
  const bathrooms =
    formatBathsWithPluralizedLabel(getBathrooms(listing), 'Bath' /* suffix */) || '- Baths';
  const squareFeet = listing.size?.squareFeet
    ? formatSquareFeet(listing.size.squareFeet, 'Sq. Ft.')
    : '- Sq. Ft.';

  return (
    <Container className="textIntent-body">
      <Address>{address}</Address>
      <Separator />
      <div>
        {bedrooms} • {bathrooms} • {squareFeet}
      </div>
    </Container>
  );
}
