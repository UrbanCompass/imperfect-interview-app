import { Media, ProcessedListing, ListingAttribute } from '@/types';
import { ROOM_TYPES } from '@/constants';
import { getBeds, getBaths } from '@/utils';

const IMAGE_ORDER = [
  ROOM_TYPES.EXTERIOR,
  ROOM_TYPES.LIVING_ROOM,
  ROOM_TYPES.DINING_ROOM,
  ROOM_TYPES.KITCHEN,
  ROOM_TYPES.BEDROOM,
  ROOM_TYPES.BATHROOM,
  ROOM_TYPES.OUTDOOR_SPACE,
  ROOM_TYPES.SMALL_SPACE,
  ROOM_TYPES.STORAGE_AND_UTILITY,
  ROOM_TYPES.FLOOR_PLAN,
];

const MIN_ROOMTYPE_ACCURACY_FOR_TEXT = 0.75;

function getBestOption(
  imagesForRoomtype: { image: Media; roomTypeScore: number }[],
  currentIndex: number
): { image: Media; roomTypeScore: number } {
  // The first image in the array has the highest roomtype score.
  const { image, roomTypeScore } = imagesForRoomtype[0];
  image.index = currentIndex.toString();
  return { image, roomTypeScore };
}

export function getBestImages(
  listings: ProcessedListing[],
  imagesByType: Map<string, { image: Media; roomTypeScore: number }[]>
): Media[] {
  const images: Media[] = [];
  IMAGE_ORDER.forEach((roomType) => {
    const options = imagesByType.get(roomType);
    if (options && options.length > 0) {
      const option = getBestOption(options, images.length);
      const { image, roomTypeScore } = option;

      // Add text on certain roomtypes, if the accuracy is high enough and this is not the first image.
      if (roomTypeScore >= MIN_ROOMTYPE_ACCURACY_FOR_TEXT && images.length !== 0) {
        if (roomType === ROOM_TYPES.LIVING_ROOM && !!listings[0]?.size?.squareFeet) {
          image.showFootage = true;
          image.textSource = ListingAttribute.SQFT;
        }
        if (roomType === ROOM_TYPES.BEDROOM) {
          image.note = getBeds(listings[0]) || '- Beds';
          image.textSource = ListingAttribute.BEDS;
        }
        if (roomType === ROOM_TYPES.BATHROOM) {
          image.note = getBaths(listings[0]) || '- Baths';
          image.textSource = ListingAttribute.BATHS;
        }
      }

      images.push(image);

      // Remove this image as a choice going forward.
      imagesByType.set(roomType, options.slice(1, options.length));
    }
  });
  if (images.length < 7) {
    // If we don't get at least 7 images in the first go, then look into the
    // "unknown" bucket to fetch remaining images to get us to 10.
    let unknownOptions = imagesByType.get(ROOM_TYPES.UNKNOWN);
    if (unknownOptions && unknownOptions.length > 0) {
      const unknownOptionsToAdd = Math.min(3, unknownOptions.length);
      for (let i = 0; i < unknownOptionsToAdd; i += 1) {
        images.push(getBestOption(unknownOptions, images.length).image);
        unknownOptions = unknownOptions.slice(1, unknownOptions.length);
      }
      imagesByType.set(ROOM_TYPES.UNKNOWN, unknownOptions);
    } else {
      // If "unknown" is empty then follow same order as above to pick one
      // image from each category until we hit 10.
      while (images.length < 10) {
        let numEmpty = 0;
        IMAGE_ORDER.forEach((roomType) => {
          const options = imagesByType.get(roomType);
          if (options && options.length > 0) {
            images.push(getBestOption(options, images.length).image);
            imagesByType.set(roomType, options.slice(1, options.length));
          } else {
            numEmpty += 1;
          }
        });
        if (numEmpty === IMAGE_ORDER.length) {
          break;
        }
      }
    }
  }
  return images;
}
