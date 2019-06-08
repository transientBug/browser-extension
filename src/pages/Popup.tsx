import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import Loader from "../components/Loader";
import CenteredContent from "../components/CenteredContent";
import PopupContainer from "../components/PopupContainer";

const Popup: React.FC = () => (
  <PopupContainer>
    <CenteredContent>
      <Loader />
    </CenteredContent>
  </PopupContainer>
);

export default Popup;
