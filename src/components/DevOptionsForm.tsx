import React from "react";

import tw from "tailwind.macro";
import { css } from "emotion/macro";

import { Settings, SettingsSetter } from "./BrowserSettingsProvider/types";

import Alert from "./Alert";
import DebugFilterList from "./DebugFilterList";
import endpoints from "../endpoints";

const H2 = tw.h2`
  block text-gray-700 text-xl3 font-bold mb-2
`;

const Form = tw.form`
  mb-4
`;

const Fieldset = tw.fieldset`
  mb-4 flex flex-col content-between
`;

const Legend = tw.legend`
  block text-gray-700 text-sm font-bold mb-2
`;

const inputStyle = css`
  ${tw`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
`;

interface DevOptionsFormProps {
  settings: Settings;
  update: SettingsSetter;
}

// TODO: clean this up with the styling
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

      <div
        className={css`
          ${tw`flex mb-4`}
        `}
      >
        <div
          className={css`
            ${tw`w-1/2`}
          `}
        >
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
        </div>
        <div
          className={css`
            ${tw`w-1/2`}
          `}
        >
          <ul
            className={css`
              ${tw`flex flex-col`}
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
                  update({ endpoint, clientId, accessToken: "" });
                }}
              >
                {endpointObj.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
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
