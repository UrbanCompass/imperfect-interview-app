import Koa from 'koa';

import loadConfig from '@uc/load-proxy-config';
import coreMiddleware from '@uc/koa-core-middleware';
import loadExperiments from '@uc/koa-load-experiments';
import bodyParser from 'koa-bodyparser';
import { loadOpty, FEATURE_ONLY } from '@uc/opty';
import identifyUser from '@uc/koa-identify-user';

import { ucGlobals, assetManifest, setGeoId, getAnalyticsUrl, roomtype } from '../middlewares';

const { port } = loadConfig();

const app = new Koa();

app.use(bodyParser());
app.use(coreMiddleware(app));
app.use(loadExperiments());
app.use(identifyUser({ allowedRoles: new Set(['Specialist', 'Admin']) }));
app.use(setGeoId);
app.use(
  loadOpty({
    features: {
      video_generator_create_video_ad_button: FEATURE_ONLY,
      video_generator_save_to_marketing_center: FEATURE_ONLY,
      video_generator_save_uploaded_images_as_assets: FEATURE_ONLY,
      video_generator_share_to_social_media: FEATURE_ONLY,
      video_generator_agent_branding_video: FEATURE_ONLY,
    },
  })
);

app.use(ucGlobals);
app.use(getAnalyticsUrl);
app.use(assetManifest);
app.use(roomtype);

app.listen(port);

export { app };
