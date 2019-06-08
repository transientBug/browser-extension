import React, { useState, useEffect } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import Loader from "../components/Loader";
import CenteredContent from "../components/CenteredContent";
import PopupContainer from "../components/PopupContainer";

const Popup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  });

  return (
    <PopupContainer>
      <CenteredContent>{isLoading ? <Loader /> : "ohia"}</CenteredContent>
    </PopupContainer>
  );
};

export default Popup;
