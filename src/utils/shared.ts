import { MAX_ADDRESS_LENGTH, MAX_TEXT_LENGTH, SQUARE_FOOTAGE_SUFFIX, CARD_TYPE } from '@/constants';
import {
  Address,
  AdType,
  AgentInfo,
  Canvas,
  CanvasType,
  DesignType,
  ListingAttribute,
  ListingStatus,
  Location,
  Logo,
  Media,
  MusicTrack,
  Preferences,
  ProcessedListing,
} from '@/types';

const CALIFORNIA = 'CA';
const DRE_PREFIX = 'DRE# ';

// This is to be used only if a thumbnail can't be found
const DEFAULT_THUMBNAIL_HANDLE = '2yKhNVOjSAKqPMUWT6ZQ';

export function isAddressScreen(index: number): boolean {
  return index === 0;
}

export function isAgentBrandingScreen(
  media: Media[],
  index: number,
  preferences: Preferences
): boolean {
  return preferences.showAgentBranding && index === media.length;
}

export function isCompassLogoScreen(
  media: Media[],
  index: number,
  preferences: Preferences
): boolean {
  const compassLogoIndex = preferences.showAgentBranding ? media.length + 1 : media.length;

  return index === compassLogoIndex;
}

export function isSqftEnabled(media: Media[], index: number): boolean {
  return index < media.length && !!media[index].showFootage;
}

export function hasCustomText(media: Media[], index: number): boolean {
  return index < media.length && !!media[index].note;
}

export function getCardType(media: Media[], index: number, preferences: Preferences): CARD_TYPE {
  if (isAddressScreen(index)) {
    return CARD_TYPE.IMAGE_WTIH_ADDRESS;
  }
  if (isAgentBrandingScreen(media, index, preferences)) {
    return CARD_TYPE.AGENT_BRANDING;
  }
  if (isCompassLogoScreen(media, index, preferences)) {
    return CARD_TYPE.COMPASS_LOGO;
  }
  if (isSqftEnabled(media, index)) {
    return CARD_TYPE.IMAGE_WITH_SQFT;
  }
  if (hasCustomText(media, index)) {
    return CARD_TYPE.IMAGE_WITH_CUSTOM_TEXT;
  }
  return CARD_TYPE.IMAGE;
}

export function getInputValue(listing: ProcessedListing, media: Media[], index: number): string {
  let inputValue = '';
  if (isSqftEnabled(media, index)) {
    const squareFeet = listing?.size?.squareFeet;
    inputValue = [squareFeet, SQUARE_FOOTAGE_SUFFIX].join(' ') || '';
  } else if (hasCustomText(media, index)) {
    inputValue = media[index].note;
  }
  return inputValue;
}

export function getTextSource(media: Media[], index: number): ListingAttribute | undefined {
  return index < media.length ? media[index].textSource : undefined;
}

export function formatTextWithLineBreak(
  rawText: string,
  maxLength: number,
  maxLineBreaks?: number
): string {
  const input = rawText.trim().split(' ');
  let temp = '';
  let text = '';
  let lineBreaks = 0;
  for (let i = 0; i < input.length; i += 1) {
    if (
      temp.length + input[i].length > maxLength &&
      (!maxLineBreaks || lineBreaks < maxLineBreaks)
    ) {
      text = `${text + temp.trim()}\n`;
      lineBreaks += 1;
      temp = `${input[i]} `;
    } else {
      temp += `${input[i]} `;
    }
  }
  text += temp;
  return text.trim();
}

export function generateMultiLineTextList(rawText: string): string[] {
  const textList = rawText.split('\n');
  return textList;
}

export function formatTextForApiService(rawText: string): string[] {
  return generateMultiLineTextList(formatTextWithLineBreak(rawText, MAX_TEXT_LENGTH));
}

export function getDefaultAddress(location: Location): Address {
  let title = location.prettyAddress || '';
  if (title.length > MAX_ADDRESS_LENGTH) {
    let streetNumber = location.streetNumber || '';
    if (streetNumber.length > 0) {
      // Capitalize the first character just in case it contains letters, so it
      // will properly match the street number in the prettyAddress.
      streetNumber = streetNumber.charAt(0).toUpperCase() + streetNumber.slice(1);
    }
    title = `${streetNumber}\n${title.replace(streetNumber, '').trim()}`;
  }

  const city = location.city?.toUpperCase() || '';
  const subtitle = `${city}, ${location.state} ${location.zipCode}`;

  return { title, subtitle };
}

export function formatAddressTitle(address: Address): string {
  let { title } = address;
  const lineBreak = title.indexOf('\n');
  if (lineBreak > 0) {
    title =
      title.substring(0, lineBreak + 1) +
      formatTextWithLineBreak(title.substring(lineBreak + 1), MAX_TEXT_LENGTH);
  } else {
    title = formatTextWithLineBreak(title, MAX_ADDRESS_LENGTH);
  }
  return title;
}

export function formatAddressTitleForApiService(address: Address): string[] {
  return generateMultiLineTextList(formatAddressTitle(address));
}

function getDRENumber(user, location: Location): string {
  if (location?.state === CALIFORNIA) {
    // It's required to show the agent's DRE number in California.
    // The "externalId" field should be populated with this, but
    // agents also typically put this in the "title" field.
    const agentProfile = user?.agentProfile;
    if (agentProfile?.externalId) {
      return DRE_PREFIX + agentProfile.externalId;
    }
    if (agentProfile?.title) {
      return agentProfile?.title;
    }
  }
  return '';
}

export function formatAgentDetails(user, team, location?: Location): string {
  const { displayName } = user!;
  const info: string[] = [];
  if (team?.teamName && team.teamName !== displayName) {
    info.push(team.teamName);
  }
  if (user.email) {
    info.push(user.email);
  }
  if (user.phone) {
    info.push(user.phone);
  }
  if (location) {
    const dreNumber = getDRENumber(user, location);
    if (dreNumber) {
      info.push(dreNumber);
    }
  }
  return info.join('\n');
}

export function getDefaultAgentInfo(user, team, logo?: Logo): AgentInfo {
  const { avatarUrl, displayName } = user!;
  let logoUrl = logo?.urlImage;
  if (logoUrl) {
    // Resize the image
    const split = logoUrl.split('.com');
    logoUrl = `${split[0]}.com/resize=width:200/${split[1]}`;
  }
  return {
    name: displayName,
    details: formatAgentDetails(user, team),
    agentAvatarUrl: avatarUrl,
    agentLogoUrl: logoUrl,
  };
}

export function getDigitalAdType(listing: ProcessedListing): AdType | null {
  if (!listing.isConsumerSearchable || listing.isOffMLS) {
    return null;
  }
  switch (listing.status) {
    case ListingStatus.ACTIVE:
      return AdType.LISTING;
    case ListingStatus.SOLD:
      return AdType.JUST_SOLD;
    default:
      return null;
  }
}

export function getVideoTitle(address: Address): string {
  return address.title?.replace(/\n/g, ' ') || 'video';
}

export function createMarketingCenterCanvas(
  title: string,
  listing: ProcessedListing,
  address: Address,
  media: Media[],
  music: MusicTrack | null,
  agentInfo: AgentInfo,
  preferences: Preferences,
  imageHandle: string | null
): Canvas {
  const properties = {
    listingIdSHA: listing.listingIdSHA,
    address,
    media,
    music,
    agentInfo,
    preferences,
  };
  return {
    canvasType: CanvasType.MARKETING_VIDEO,
    designType: DesignType.VIDEO,
    designId: 'listing_video',
    title,
    imageHandle: imageHandle || DEFAULT_THUMBNAIL_HANDLE,
    body: { data: JSON.stringify(properties) },
  };
}
