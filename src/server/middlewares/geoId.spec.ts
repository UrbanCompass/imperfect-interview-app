import { NYC_GEO_ID } from '@uc/thrift2npme/dist/geography/common';
import { setGeoId } from './geoId';

const next = jest.fn();
const geoId = 'foo';
let mockCtx;

jest.mock('@uc/geo-locale', () => {
  return {
    __esModule: true,
    default: jest.fn(() => geoId),
  };
});

describe('geoid', () => {
  beforeEach(() => {
    next.mockClear();
    mockCtx = {
      state: {
        user: {},
      },
      request: {
        header: {
          cookie: {},
        },
      },
    };
  });

  it('geoLocale returns id', () => {
    setGeoId(mockCtx, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(mockCtx.state.geoId).toEqual(geoId);
  });

  it('geoLocale throws', () => {
    mockCtx = { state: {} };
    setGeoId(mockCtx, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(mockCtx.state.geoId).toEqual(NYC_GEO_ID);
  });
});
