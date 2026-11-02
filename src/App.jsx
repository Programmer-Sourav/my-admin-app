import { useState } from 'react'
import './App.css'

import React, { lazy, Suspense } from "react";

import ErrorBoundary from "./components/ErrorBoundary";

const Dashboard = lazy(() => import("./Dashboard"));


function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="loading-state">
            Loading application...
          </div>
        }
      >
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;