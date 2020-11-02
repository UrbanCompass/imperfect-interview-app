import { listSearch } from '@/api';
import { NUM_IMAGES_REQUIRED } from '@/constants';
import {
  ListingStatus,
  ListingType,
  GlobalUser,
  ProcessedListing,
  RentalStatus,
  SaleStatus,
  FILTER_REASON,
  SORT_ORDER,
} from '@/types';

export async function loadBrandingListings(
  user: GlobalUser,
  listingStatus: ListingStatus
): Promise<ProcessedListing[]> {
  let rentalStatuses: RentalStatus[], saleStatuses: SaleStatus[];

  switch (listingStatus) {
    case ListingStatus.ACTIVE:
      rentalStatuses = [RentalStatus.AVAILABLE];
      saleStatuses = [SaleStatus.AVAILABLE];
      break;
    case ListingStatus.COMING_SOON:
      rentalStatuses = [RentalStatus.COMING_SOON];
      saleStatuses = [SaleStatus.COMING_SOON];
      break;
    case ListingStatus.SOLD:
      rentalStatuses = [RentalStatus.RENTED];
      saleStatuses = [SaleStatus.SOLD];
      break;
    default:
      throw new Error();
  }

  const response = await listSearch({
    /* These are the key parameters: */
    rentalStatuses,
    saleStatuses,
    ownerId: user.personId,
    sortOrder: SORT_ORDER.MOST_RECENT,
    imagesRequired: NUM_IMAGES_REQUIRED,
    /* These parameters are copied over from agent_profile and might need tweaking: */
    listingTypes: [ListingType.LISTING, ListingType.SALES, ListingType.SHORT_TERM_RENTAL],
    includeInContract: true,
    excludePendingSales: false,
    includedFilters: [FILTER_REASON.FURNISHED, FILTER_REASON.KEEP],
    /* These parameters are boring but necessary: */
    rawQuery: '',
    debugLevel: 0,
    start: 0,
    num: 100,
  });

  // Only return listings with media (oddly, `imagesRequired` doesn't do this for us...)
  const listingsWithMedia = response.listings?.filter((listing) => listing.media?.length);
  return listingsWithMedia || [];
}
