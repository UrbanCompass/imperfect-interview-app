import React from 'react';

export function mockComponent(componentName: string, hasDOM?: boolean) {
  function Component(): JSX.Element | null {
    return hasDOM ? <div /> : null;
  }
  Component.displayName = componentName;
  return Component;
}

export function mockComponentWithChildren(componentName) {
  // eslint-disable-next-line react/prop-types
  function Component({ children }): JSX.Element {
    return <>{children}</>;
  }
  Component.displayName = componentName;
  return Component;
}
