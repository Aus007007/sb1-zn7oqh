import React from 'react';
import Spline from '@splinetool/react-spline';
import SplineErrorBoundary from './SplineErrorBoundary';

interface SplineWrapperProps {
  scene: string;
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

export default function SplineWrapper({ scene, onLoad, fallback }: SplineWrapperProps) {
  const [error, setError] = React.useState(false);

  if (error) {
    return fallback || null;
  }

  return (
    <SplineErrorBoundary>
      <Spline
        scene={scene}
        onLoad={onLoad}
        onError={() => setError(true)}
      />
    </SplineErrorBoundary>
  );
}