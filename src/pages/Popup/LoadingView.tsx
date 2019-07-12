import React from "react";

import CenteredContent from "../../components/CenteredContent";
import Loader from "../../components/Loader";

const LoadingView = () => (
  <CenteredContent>
    <Loader />
    <p>Testing ...</p>
  </CenteredContent>
);

export default LoadingView;
