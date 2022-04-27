import React from 'react';
import Loadable from 'react-loadable';

interface LayoutProps {
  error?: any;
}

function MyLoadingComponent({ error }: LayoutProps) {
  if (error) {
    return <div>Error!</div>;
  } else {
    return <div>Loading...</div>;
  }
}

const LoadableAnotherComponent = Loadable({
  loader: () => import('./another-component'),
  loading: MyLoadingComponent
});

export default class MyComponent extends React.Component {
  render() {
    return <LoadableAnotherComponent />;
  }
}
