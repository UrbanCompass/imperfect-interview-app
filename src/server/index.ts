import path from 'path';
import serve from 'koa-static-server';
import env from 'env-var';

import { render } from './middlewares';
import { app } from './app';

const USE_CDN = env.get('USE_CDN', 'false').asBool();

if (!USE_CDN) {
  app.use(
    serve({
      rootDir: path.resolve(String(process.env.PWD), 'dist'),
      rootPath: path.join('/video-generator', 'static'),
    })
  );
}
app.use(render);
