import { ucGlobals } from './ucGlobals';

describe('ucGlobals', () => {
  let ctx;
  const next = jest.fn();

  beforeAll(() => {
    ctx = {
      state: {
        mlsMemberships: { '12345': '54321' },
        user: { fakeUser: true },
        opty: { asdfsafdaf: true },
      },
      googleApiKeys: { apiKey: 'fakeApiKey' },
    };
  });

  it('sets globals string', async () => {
    await ucGlobals(ctx, next);
    expect(ctx.state.ucGlobals).toEqual('{"user":{"fakeUser":true},"opty":{"asdfsafdaf":true}}');
  });

  it('continues', () => {
    expect(next).toHaveBeenCalledTimes(1);
  });
});
