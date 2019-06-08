import React, { Component } from "react";

const ErrorMessage = ({ error }: { error: any }) => (
  <h1>Something went wrong :( {error.message}</h1>
);

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;

    return <>{hasError ? <ErrorMessage error={error} /> : children}</>;
  }
}

export default ErrorBoundary;
