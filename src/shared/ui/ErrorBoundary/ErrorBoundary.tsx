import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryFallbackProps = {
  error: Error;
  reset: () => void;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
};

type ErrorBoundaryState = {
  error: Error | null;
};

const didResetKeysChange = (prevResetKeys: unknown[] = [], nextResetKeys: unknown[] = []) => {
  if (prevResetKeys.length !== nextResetKeys.length) return true;
  return nextResetKeys.some((key, idx) => !Object.is(key, prevResetKeys[idx]));
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && didResetKeysChange(prevProps.resetKeys, this.props.resetKeys)) {
      this.reset();
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (!error) return children;

    if (typeof fallback === 'function') {
      return fallback({ error, reset: this.reset });
    }
    return fallback;
  }
}
