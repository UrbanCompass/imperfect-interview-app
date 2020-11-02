import { formatBathsWithPluralizedLabel, getBathrooms } from '@uc/format-listing-baths';
import { formatBedroomsWithPluralizedLabel } from '@uc/format-listing-bedrooms';
import { formatListingPrice } from '@uc/format-listing-price';

import { ProcessedListing } from '@/types';

export function getBeds(listing: ProcessedListing): string | null {
  return formatBedroomsWithPluralizedLabel(listing, 'Bed' /* suffix */);
}

export function getBaths(listing: ProcessedListing): string | null {
  return formatBathsWithPluralizedLabel(getBathrooms(listing), 'Bath' /* suffix */);
}

export function getSqft(listing: ProcessedListing): string | null {
  const sqft = listing?.size?.squareFeet;
  return sqft ? `${sqft} SQ. FT.` : null;
}

export function getListingStatus(listing: ProcessedListing): string | null {
  return listing?.localizedStatus || null;
}

export function getPrice(listing: ProcessedListing): string | null {
  return formatListingPrice(listing, undefined /*  rentalPeriod */, {
    abbreviateThousands: true,
    abbreviateMillions: true,
  });
}
