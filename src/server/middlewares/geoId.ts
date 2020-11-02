import getGeoId from '@uc/geo-locale';
import { NYC_GEO_ID } from '@uc/thrift2npme/dist/geography/common';

export function setGeoId(ctx, next) {
  try {
    ctx.state.geoId = getGeoId(ctx.request.header.cookie, ctx.state.user);
  } catch (err) {
    /**
     * If no locale can be determined, certain API calls within getNavigation
     * throw errors. Production currently defaults to New York City in careers.
     */
    ctx.state.geoId = NYC_GEO_ID;
  }

  return next();
}
