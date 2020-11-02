import { MusicCategory } from '@/types';

export const APP_BASE_URL = '/video-generator';
export const REACT_APP_PLACEHOLDER = 'REACT_APP_PLACEHOLDER';
export const UC_GLOBALS_ID = 'listing-video-editor-uc-globals';

export const SOURCE_APP = 'listing_video_editor';

export const STAGE = {
  INPUT: 'input',
  SELECT: 'select',
  EDIT: 'edit',
  PROGRESS: 'progress',
  VIEW: 'view',
};

export enum CARD_TYPE {
  IMAGE,
  IMAGE_WTIH_ADDRESS,
  IMAGE_WITH_CUSTOM_TEXT,
  IMAGE_WITH_SQFT,
  AGENT_BRANDING,
  COMPASS_LOGO,
}

export const TEXT_CARD_TYPES = new Set([
  CARD_TYPE.IMAGE_WTIH_ADDRESS,
  CARD_TYPE.IMAGE_WITH_CUSTOM_TEXT,
  CARD_TYPE.IMAGE_WITH_SQFT,
  CARD_TYPE.AGENT_BRANDING,
]);

export const MAX_ADDRESS_LENGTH = 14;
export const MAX_TEXT_LENGTH = 15;
export const MAX_AGENT_NAME_LENGTH = 34;
export const SQUARE_FOOTAGE_SUFFIX = 'SQ. FT.';

export const MUSIC_TRACKS: MusicCategory[] = [
  {
    label: 'Cheerful',
    name: 'cheerful',
    tracks: [
      { label: 'Happy together', name: 'happy-together' },
      { label: 'Aftershock blue', name: 'aftershock-blue' },
      { label: 'Clap tap', name: 'clap-tap' },
    ],
  },
  {
    label: 'Elegant',
    name: 'elegant',
    tracks: [
      { label: 'Minimalisms', name: 'minimalisms' },
      { label: 'Inspiring motion', name: 'inspiring-motion' },
      { label: 'Working solutions', name: 'working-solutions' },
    ],
  },
  {
    label: 'Feel good',
    name: 'feel-good',
    tracks: [
      { label: 'A promising future', name: 'a-promising-future' },
      { label: 'In the light', name: 'in-the-light' },
      { label: 'Young things', name: 'young-things' },
    ],
  },
  {
    label: 'Funky',
    name: 'funky',
    tracks: [
      { label: "Livin' for the city", name: 'livin-for-the-city' },
      { label: 'Neon lights', name: 'neon-lights' },
      { label: 'Orbital groove', name: 'orbital-groove' },
    ],
  },
  {
    label: 'Playful',
    name: 'playful',
    tracks: [
      { label: 'Oh so happy', name: 'oh-so-happy' },
      { label: 'All I need', name: 'all-i-need' },
      { label: 'Sweet and sour', name: 'sweet-and-sour' },
    ],
  },
  {
    label: 'Uplifting',
    name: 'uplifting',
    tracks: [
      { label: 'Soaring', name: 'soaring' },
      { label: 'A great achievement', name: 'a-great-achievement' },
      { label: 'Up and running', name: 'up-and-running' },
    ],
  },
];
export const TRACKS_PER_CATEGORY = 3;

export const ROOM_TYPES = {
  BATHROOM: 'bathroom',
  BEDROOM: 'bedroom',
  DINING_ROOM: 'diningroom',
  EXTERIOR: 'exterior',
  FLOOR_PLAN: 'floorplan',
  KITCHEN: 'kitchen',
  LIVING_ROOM: 'livingroom',
  OUTDOOR_SPACE: 'outdoorspace',
  SMALL_SPACE: 'smallspace',
  STORAGE_AND_UTILITY: 'storageAndUtility',
  UNKNOWN: 'unknown',
};

export const DIGITAL_ADS_PATH = '/app/ads-center/digital/';
export const FILESTACK_API_KEY = 'ALjVIPyY5SBCdSTP1630Sz';

export const NUM_IMAGES_REQUIRED = 1;
