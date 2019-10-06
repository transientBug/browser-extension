import React from "react";

import CenteredContent from "../../components/CenteredContent";
import Loader from "../../components/Loader";
import P from "../../components/Text";

interface LoadingViewProps {
  message?: string;
}

const LoadingView: React.FC<LoadingViewProps> = ({ message }) => (
  <CenteredContent>
    <Loader />
    {message && <P>{message}</P>}
  </CenteredContent>
);

export default LoadingView;
