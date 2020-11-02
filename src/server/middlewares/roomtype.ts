import { getRoomType } from '@/api';

const MAX_IMAGE_REQUESTS = 20;

async function getRoomTypes({ media }): Promise<any> {
  const calls = [] as any;
  media.slice(0, MAX_IMAGE_REQUESTS).forEach((image) => {
    // Classification accuracy is highest for 640 x 480 thumbnails.
    const thumbnailUrl = image.thumbnailUrl.replace('165x165', '640x480');
    calls.push(getRoomType({ url: thumbnailUrl }));
  });

  const responses = (await Promise.all(calls)) as any;

  const results = [] as any;

  responses.forEach((response, index) => {
    if (response && response.result) {
      const { valid, roomType, roomTypeScore } = JSON.parse(response.result.toString());
      if (valid) {
        results.push({ image: media[index], roomType, roomTypeScore });
      }
    }
  });

  return results;
}

export async function roomtype(ctx, next) {
  if (ctx.request.url.includes('/api/roomtype')) {
    try {
      const { body } = ctx.request;
      const result = await getRoomTypes(body);
      ctx.body = JSON.stringify(result);
    } catch (_) {
      ctx.status = 500;
    }
  } else {
    await next();
  }
}
