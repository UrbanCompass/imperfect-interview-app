import serialize from 'serialize-javascript';
import get from 'lodash/get';

export async function ucGlobals(ctx, next): Promise<void> {
  const { user, opty } = get(ctx, 'state', {});
  ctx.state.ucGlobals = serialize(
    {
      user,
      opty,
    },
    { isJSON: true }
  );

  await next();
}
