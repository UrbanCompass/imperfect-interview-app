import { ListingStatus, Media, MusicTrack, ProcessedListing } from '@/types';
import { SOURCE_APP } from '@/constants';

interface ListingProperties {
  listingId?: string;
  listingStatus?: ListingStatus;
  totalImagesCount: number;
}

function track(name: string, extraProperties = {}): void {
  const properties = {
    product: SOURCE_APP,
    ...extraProperties,
  };

  if (window.analytics) {
    window.analytics.track(name, properties);
  }
}

function getTotalImageCount(listing: ProcessedListing): number {
  return listing?.media?.length || 0;
}

function getSelectedImageCount(media: Media[]): number {
  return media.length;
}

function getUploadedImageCount(media: Media[]): number {
  const uploaded = media?.filter((m) => !!m.isCustomUpload);
  return uploaded.length;
}

function isSqftEnabled(media: Media[]): boolean {
  return !!media?.some((m) => m.showFootage);
}

function getCustomTextCount(media: Media[]): number {
  const withText = media?.filter((m) => !!m.note) || [];
  return withText.length;
}

function getListingAttributeCount(media: Media[]): number {
  const withListingAttribute = media?.filter((m) => !!m.textSource) || [];
  return withListingAttribute.length;
}

function isAudioEnabled(music: MusicTrack): boolean {
  return !!music;
}

function getTrackName(music: MusicTrack): string {
  return music?.name;
}

function getListingProperties(listing: ProcessedListing): ListingProperties {
  return {
    listingId: listing?.listingIdSHA,
    listingStatus: listing?.status,
    totalImagesCount: getTotalImageCount(listing),
  };
}

function getImageSelectionProperties(
  listing: ProcessedListing,
  media: Media[]
): Record<string, unknown> {
  return {
    ...getListingProperties(listing),
    selectedImagesCount: getSelectedImageCount(media),
    uploadedImagesCount: getUploadedImageCount(media),
  };
}

function getFullVideoProperties(
  listing: ProcessedListing,
  media: Media[],
  music: MusicTrack
): Record<string, unknown> {
  return {
    ...getImageSelectionProperties(listing, media),
    sqftEnabled: isSqftEnabled(media),
    customTextCount: getCustomTextCount(media),
    listingAttributeCount: getListingAttributeCount(media),
    audioEnabled: isAudioEnabled(music),
    audioTrackName: getTrackName(music),
  };
}

export function trackHomepageViewed(): void {
  track('Video Generator Viewed Homepage');
}

export function trackListingSelected(listingIdSHA: string): void {
  track('Video Generator Selected Listing', {
    listingId: listingIdSHA,
  });
}

export function trackAutoGenerateClicked(): void {
  track('Video Generator Clicked Auto Generate');
}

export function trackCreateCustomClicked(): void {
  track('Video Generator Clicked Create Custom');
}

export function trackCreateCustomBrandingClicked(): void {
  track('Video Generator Clicked Create Custom (Branding Video)');
}

export function trackImageSelectionPageViewed(listing, autoGenerated, videoUrl): void {
  track('Video Generator Viewed Image Selection Page', {
    ...getListingProperties(listing),
    autoGenerated,
    videoUrl,
  });
}

export function trackBrandingImageSelectionPageViewed(
  listingStatusFilter,
  autoGenerated,
  videoUrl
): void {
  track('Video Generator Viewed Image Selection Page (Branding Video)', {
    listingStatusFilter,
    autoGenerated,
    videoUrl,
  });
}

export function trackImagesUploaded(count: number, autoGenerated, videoUrl): void {
  track('Video Generator Uploaded Images', { count, autoGenerated, videoUrl });
}

export function trackImageSelected(autoGenerated, videoUrl): void {
  track('Video Generator Selected Image', { autoGenerated, videoUrl });
}

export function trackImageUnselected(autoGenerated, videoUrl): void {
  track('Video Generator Unselected Image', { autoGenerated, videoUrl });
}

export function trackImagesSelected(listing, media, autoGenerated, videoUrl): void {
  track('Video Generator Selected Images', {
    ...getImageSelectionProperties(listing, media),
    autoGenerated,
    videoUrl,
  });
}

export function trackCustomizationPageViewed(listing, media, autoGenerated, videoUrl): void {
  track('Video Generator Viewed Customization Page', {
    ...getImageSelectionProperties(listing, media),
    autoGenerated,
    videoUrl,
  });
}

export function trackImageReordered(autoGenerated, videoUrl): void {
  track('Video Generator Reordered Image', { autoGenerated, videoUrl });
}

export function trackImageRemoved(autoGenerated, videoUrl): void {
  track('Video Generator Removed Image', { autoGenerated, videoUrl });
}

export function trackAgentBrandingScreenRemoved(autoGenerated, videoUrl): void {
  track('Video Generator Removed Agent Branding Screen', { autoGenerated, videoUrl });
}

export function trackCompassLogoScreenRemoved(autoGenerated, videoUrl): void {
  track('Video Generator Removed Compass Logo Screen', { autoGenerated, videoUrl });
}

export function trackListingAttributeSelected(attribute, autoGenerated, videoUrl): void {
  track('Video Generator Selected Listing Attribute', {
    attribute,
    autoGenerated,
    videoUrl,
  });
}

export function trackAudioPlayed(music): void {
  track('Video Generator Played Audio', {
    audioTrackName: getTrackName(music),
  });
}

export function trackAudioPaused(music): void {
  track('Video Generator Paused Audio', {
    audioTrackName: getTrackName(music),
  });
}

export function trackAudioDisabled(autoGenerated, videoUrl): void {
  track('Video Generator Disabled Audio', {
    autoGenerated,
    videoUrl,
  });
}

export function trackAudioSelected(music, autoGenerated, videoUrl): void {
  track('Video Generator Selected Audio', {
    audioTrackName: getTrackName(music),
    autoGenerated,
    videoUrl,
  });
}

export function trackVideoCustomized(listing, media, music, autoGenerated, videoUrl): void {
  track('Video Generator Customized Video', {
    ...getFullVideoProperties(listing, media, music),
    autoGenerated,
    videoUrl,
  });
}

export function trackProgressPageViewed(listing, media, music, autoGenerated, videoUrl): void {
  track('Video Generator Viewed Progress Page', {
    ...getFullVideoProperties(listing, media, music),
    autoGenerated,
    videoUrl,
  });
}

export function trackDownloadPageViewed(listing, media, music, autoGenerated, videoUrl): void {
  track('Video Generator Viewed Download Page', {
    ...getFullVideoProperties(listing, media, music),
    autoGenerated,
    videoUrl,
  });
}

export function trackDownloadClicked(listing, media, music, autoGenerated, videoUrl): void {
  track('Video Generator Clicked Download', {
    ...getFullVideoProperties(listing, media, music),
    autoGenerated,
    videoUrl,
  });
}

export function trackStartOverClicked(autoGenerated, videoUrl): void {
  track('Video Generator Clicked Start Over', { autoGenerated, videoUrl });
}

export function trackEditVideoClicked(autoGenerated, videoUrl): void {
  track('Video Generator Clicked Edit Video', { autoGenerated, videoUrl });
}

export function trackBackToDigitalAdsClicked(): void {
  track('Video Generator Clicked Back To Digital Ads');
}

export function trackCreateVideoAdClicked(adType): void {
  track('Video Generator Clicked Create Video Ad', { adType });
}
