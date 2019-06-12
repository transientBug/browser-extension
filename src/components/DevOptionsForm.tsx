/* global browser */

import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

import { Settings, SettingsUpdater } from "./BrowserSettingsProvider";

import Alert from "./Alert";
import DebugFilterList from "./DebugFilterList";

import Select from "react-select";
import { components as SelectComponents } from "react-select";

// import debugFactory from "../debug";

// const debug = debugFactory.extend("components").extend("DevOptionsForm");

interface Endpoint {
  name: string;
  endpoint: string;
  clientId?: string;
}

const endpoints: Endpoint[] = [
  {
    name: "Production",
    endpoint: "https://transientbug.ninja",
    clientId: "755999239a453f73ab1108d0b94e194e3f54b51255283877f56ce6917e7f8995"
  },
  {
    name: "Staging",
    endpoint: "https://staging.transientbug.ninja",
    clientId: "1f9e449bc6afd7c7b2bcb48d9506a55bc7a3221238e61acfdb208ec2dca3a11a"
  }
];

const H2 = styled.h2`
  ${tw`block text-gray-700 text-xl3 font-bold mb-2`}
`;

const Form = styled.form`
  ${tw`mb-4`}
`;

const Fieldset = styled.fieldset`
  ${tw`mb-4 flex flex-col content-between`}
`;

const Legend = styled.legend`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

const inputStyle = css`
  ${tw`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
`;

interface DevOptionsFormProps {
  settings: Settings;
  update: SettingsUpdater;
}

const DevOptionsForm: React.FC<DevOptionsFormProps> = ({
  settings,
  update
}) => (
  <Form>
    <H2>Development Settings</H2>

    <Alert>
      {{
        title: "Development Build",
        message: `This build has debugging and development tools and settings enabled. Please tread carefully.`
      }}
    </Alert>

    <Fieldset>
      <Legend>Endpoint</Legend>

      <input
        type="url"
        className={inputStyle}
        value={settings.endpoint}
        onChange={e => update({ endpoint: e.target.value })}
        placeholder="Endpoint URL"
      />
      <input
        type="text"
        className={inputStyle}
        value={settings.clientId}
        onChange={e => update({ clientId: e.target.value })}
        placeholder="Client ID"
      />

      <ul
        className={css`
          ${tw`w-64 flex flex-col`}
        `}
      >
        {endpoints.map((endpointObj, idx) => (
          <li
            key={idx}
            className={css`
              ${tw`relative -mb-px block border p-4 border-gray hover:bg-gray-100 hover:cursor-pointer`}
            `}
            onClick={() => {
              const { endpoint, clientId } = endpointObj;
              update({ endpoint, clientId });
            }}
          >
            {endpointObj.name}
          </li>
        ))}
      </ul>
    </Fieldset>

    <Fieldset>
      <Legend>Debug Settings</Legend>

      <DebugFilterList
        onChange={debugFilter => update({ debugFilter })}
        debugFilter={settings.debugFilter || []}
      />
    </Fieldset>
  </Form>
);

export default DevOptionsForm;
