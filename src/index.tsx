import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

// Base tailwind styles
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

import Background from "./pages/Background";

const {
  location: { hash }
} = window;

const RenderReact = () => {
  const root = document.getElementById("root");

  // TODO: Background does not need to be a react page since it'll never be seen
  const Components: { [keys: string]: React.LazyExoticComponent<any> } = {
    "#options": lazy(() => import("./pages/Options")),
    "#popup": lazy(() => import("./pages/Popup"))
  };

  const Component = Components[hash];
  if (!Component)
    throw new Error(
      `Something went terribly wrong! No page found for #{ hash }`
    );

  ReactDOM.render(
    <ErrorBoundary>
      <Suspense fallback={Loader}>
        <Component />
      </Suspense>
    </ErrorBoundary>,
    root
  );
};

if (hash === "#background") Background();
else RenderReact();
