import React, { Component } from "react";

import Alert from "./Alert";

type State = {
  hasError: boolean;
  error: any;
};

class ErrorBoundary extends Component {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;

    if (!hasError) return children;

    const { message = "Unknown error" } = error;

    return (
      <Alert color="red">
        {{
          title: "Uh oh",
          message: `Thaaaat's not gone well - ${message}`
        }}
      </Alert>
    );
  }
}

export default ErrorBoundary;
