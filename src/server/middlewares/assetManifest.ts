import { readFileSync } from 'fs';
import { resolve } from 'path';

export async function assetManifest(ctx, next): Promise<void> {
  const assetsPath = resolve(String(process.env.PWD), 'dist');
  ctx.state.assets = JSON.parse(readFileSync(`${assetsPath}/manifest.json`).toString());

  await next();
}
