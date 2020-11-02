import React from 'react';

interface ShowDataProps {
  loading: boolean;
  loadError: boolean;
  loaded: boolean;
  data: any[] | Record<string, any>;
}

interface HookTesterProps {
  data?: any;
  hook: any;
}

function ShowData({ loading, loadError, loaded, data }: ShowDataProps): JSX.Element {
  return (
    <>
      <p data-testid="load-status">
        {`loading: ${loading}, loadError: ${loadError}, loaded: ${loaded}, loaded: ${loaded}`}
      </p>
      <p data-testid="resolved-data">{JSON.stringify(data)}</p>
    </>
  );
}

function HookTester({ data, hook }: HookTesterProps) {
  const result = hook(data);
  return <ShowData {...result} />;
}

export { ShowData, HookTester };
