import { readFileSync } from 'fs';
import { mocked } from 'ts-jest/utils';
import { assetManifest } from './assetManifest';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('ucGlobals', () => {
  let ctx;
  const next = jest.fn();
  mocked(readFileSync).mockImplementation(() => '{"foo": "local/bar"}');

  beforeAll(() => {
    ctx = {
      state: {},
    };
  });

  it('sets asset manifest', async () => {
    await assetManifest(ctx, next);
    expect(ctx.state.assets).toEqual({ foo: 'local/bar' });
  });

  it('continues', () => {
    expect(next).toHaveBeenCalledTimes(1);
  });
});
