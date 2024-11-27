import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class SplineErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Spline error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Fallback to default background
    }

    return this.props.children;
  }
}

export default SplineErrorBoundary;