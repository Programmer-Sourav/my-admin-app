import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    // Send to monitoring service in production
    console.error("Dashboard rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>

          <p>
            An unexpected error occurred while rendering the dashboard.
          </p>

          <button
            onClick={() => window.location.reload()}
          >
            Reload application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}