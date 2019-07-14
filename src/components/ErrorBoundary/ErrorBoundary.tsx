import React, { Component } from "react";

import Alert from "../Alert";

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
          message: (
            <>
              <p>Thaaaat's not gone well - {message}</p>
              <p>
                Chances are, if you are seeing this, something terrible -truely
                terrible- has happened. You should first try to reproduce this
                error, taking note of the steps. After that, you should file a
                bug report{" "}
                <a href="https://github.com/transientBug/browser-extension/issues/new">
                  here
                </a>{" "}
                with as much detail as possible about the steps to reproduce
                this error.
              </p>
            </>
          )
        }}
      </Alert>
    );
  }
}

export default ErrorBoundary;
