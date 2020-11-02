/* istanbul ignore file */
import env from 'env-var';
import { Context, Next } from 'koa';

export async function getAnalyticsUrl(ctx: Context, next: Next): Promise<void> {
  const dynamicjsCDNUrl = env.get('DYNAMICJS_CDN_URL').asString();
  if (dynamicjsCDNUrl) {
    const segmentEnabled = env.get('SEGMENT_ENABLED').asString();
    ctx.state.analyticsUrl = `${dynamicjsCDNUrl}/analytics.js?isAgent=false&segmentEnabled=${segmentEnabled}`;
  }

  await next();
}
