import { ProcessedListing } from '@uc/thrift2npme/dist/listing_translation/processed_listing';
import { Media } from '@/types';
import { getBestImages } from './getBestImages';

const EmeraldStListing: ProcessedListing = {
  listingIdSHA: '562963071042533505',
  size: {
    bedrooms: 4,
    fullBathrooms: 3,
    halfBathrooms: 1,
    totalBathrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2384,
    lotSizeInSquareFeet: 9531,
    formattedLotSize: '0.22 AC / 9,531 SF',
  },
  status: 14,
  media: [
    {
      category: 0,
      thumbnailUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_0/165x165.jpg',
      originalUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_0/origin.jpg',
      width: 2048,
      height: 1536,
    },
    {
      category: 0,
      thumbnailUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_1/165x165.jpg',
      originalUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_1/origin.jpg',
      width: 1152,
      height: 1536,
    },
  ],
};

const EmeraldStImages = [
  {
    image: {
      category: 0,
      thumbnailUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_0/165x165.jpg',
      originalUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_0/origin.jpg',
      width: 2048,
      height: 1536,
    } as Media,
    roomTypeScore: 0.48435845971107483,
  },
  {
    image: {
      category: 0,
      thumbnailUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_1/165x165.jpg',
      originalUrl:
        'https://compass-gamma-media-image-storage.s3.amazonaws.com/b626c205e9b4f151bdd36a39ab62542a26960c79_img_1/origin.jpg',
      width: 1152,
      height: 1536,
    } as Media,
    roomTypeScore: 0.3679862916469574,
  },
];

describe('getBestImages()', () => {
  it('returns all images from a listing with images all "unknown" (VG-167)', () => {
    const imagesByType = new Map(
      Object.entries({
        unknown: EmeraldStImages,
      })
    );
    expect(getBestImages([EmeraldStListing], imagesByType).length).toBe(2);
  });

  it('returns all images from a listing with images all of the same known type', () => {
    const imagesByType = new Map(
      Object.entries({
        exterior: EmeraldStImages,
      })
    );
    expect(getBestImages([EmeraldStListing], imagesByType).length).toBe(2);
  });
});
