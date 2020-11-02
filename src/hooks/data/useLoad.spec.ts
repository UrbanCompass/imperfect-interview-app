import { useState } from 'react';
import { mocked } from 'ts-jest/utils';
import { useLoad } from './useLoad';

jest.mock('react', () => ({
  useState: jest.fn(),
}));

describe('useLoad', (): void => {
  let hook;
  const setLoadStatus = jest.fn();
  const initialData = { fakeData: true };

  beforeAll((): void => {
    mocked<any>(useState).mockImplementation((val) => [{ ...val }, setLoadStatus]);
  });

  beforeEach((): void => {
    hook = useLoad(initialData);
    setLoadStatus.mockClear();
  });

  it('defaults data', (): void => {
    const result = useLoad();
    expect(result).toEqual({
      data: {},
      loading: false,
      loaded: false,
      loadError: false,
      fetchData: expect.any(Function),
    });
  });

  it('uses given default data', (): void => {
    expect(hook).toEqual({
      data: initialData,
      loading: false,
      loaded: false,
      loadError: false,
      fetchData: expect.any(Function),
    });
  });

  it('successfully fetches data with given loader and given arguments', async () => {
    const resolvedData = { resolved: true };
    const loader = jest.fn(() => Promise.resolve(resolvedData));
    await hook.fetchData(loader, 'something');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenCalledWith('something');
    expect(setLoadStatus).toHaveBeenCalledTimes(2);
    expect(setLoadStatus).toHaveBeenCalledWith({
      data: initialData,
      loading: true,
      loaded: false,
      loadError: false,
    });
    expect(setLoadStatus).toHaveBeenLastCalledWith({
      data: resolvedData,
      loading: false,
      loaded: true,
      loadError: false,
    });
  });

  it("successfully fetches data with given loader and given arguments when it's loaded", async () => {
    const resolvedData = { resolved: true };
    const loader = jest.fn(() => Promise.resolve(resolvedData));
    hook = useLoad({});
    await hook.fetchData(loader, 'something');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenCalledWith('something');
    expect(setLoadStatus).toHaveBeenCalledTimes(2);
    expect(setLoadStatus).toHaveBeenLastCalledWith({
      data: resolvedData,
      loading: false,
      loaded: true,
      loadError: false,
    });
  });

  it('handles data unresolved cases', async () => {
    const loader = jest.fn(() => Promise.resolve());
    await hook.fetchData(loader, 'something');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenCalledWith('something');
    expect(setLoadStatus).toHaveBeenCalledTimes(2);
    expect(setLoadStatus).toHaveBeenCalledWith({
      data: initialData,
      loading: true,
      loaded: false,
      loadError: false,
    });
    expect(setLoadStatus).toHaveBeenLastCalledWith({
      data: initialData,
      loading: false,
      loadError: true,
      loaded: false,
    });
  });

  it('handles failed requests', async (): Promise<any> => {
    const loader = jest.fn(() => Promise.reject(new Error()));
    await hook.fetchData(loader, 'something');

    expect(loader).toHaveBeenCalledTimes(1);
    expect(loader).toHaveBeenCalledWith('something');
    expect(setLoadStatus).toHaveBeenCalledTimes(2);
    expect(setLoadStatus).toHaveBeenCalledWith({
      data: initialData,
      loading: true,
      loaded: false,
      loadError: false,
    });
    expect(setLoadStatus).toHaveBeenLastCalledWith({
      data: initialData,
      loading: false,
      loadError: true,
      loaded: false,
    });
  });
});
