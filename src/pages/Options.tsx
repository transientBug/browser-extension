/* global browser */

import React, { useEffect } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import { Store, useDispatch, useState } from "../ducks/store";
import { reducer, state, operations } from "../ducks/options";

import debugFactory from "../debug";
import AuthenticationForm from "../components/AuthenticationForm";
import DevOptionsForm from "../components/DevOptionsForm";
import BuildInfo from "../components/BuildInfo";

import "./Background";
import "./Popup";

const DEBUGABLE = process.env.REACT_APP_DEBUGABLE;

const debug = debugFactory.extend("page").extend("Options");

const Wrapper = styled.div`
  ${tw`w-full bg-white shadow-md rounded px-8 pt-6 pb-8`}
`;

const Options: React.FC = () => {
  const state = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const settings = await browser.storage.local.get();

      dispatch(operations.initSettings(settings));
    })();
  });

  return (
    <Wrapper>
      <AuthenticationForm
        accessToken={state.accessToken}
        onLogout={() =>
          dispatch(operations.changeSettings({ accessToken: "" }))
        }
      />

      <BuildInfo temporaryInstall={state.temporaryInstall} />

      {DEBUGABLE && <DevOptionsForm />}
    </Wrapper>
  );
};

const OptionsPage: React.FC = () => {
  return (
    <Store reducer={reducer} initialState={state}>
      <Options />
    </Store>
  );
};

export default OptionsPage;
