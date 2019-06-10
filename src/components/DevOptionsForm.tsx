import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

import Alert from "./Alert";
import { Settings, SettingsUpdater } from "./BrowserSettingsProvider";

import debugFactory from "../debug";
const debug = debugFactory.extend("components").extend("DevOptionsForm");

type DebugData = {
  namespace: string;
  description: React.ReactNode;
  debugFlag: string;
};

const debugInstances: DebugData[] = [
  {
    namespace: "Background Page",
    description: `Includes login and background saving functionality along with post-install setup.`,
    debugFlag: "transientBug:pages:Background*"
  },
  {
    namespace: "Options Page",
    description: `Includes fetching and modifying extension settings and auth functionality (login/logout)`,
    debugFlag: "transientBug:pages:Options*"
  },
  {
    namespace: "Pop-up",
    description: `Includes the page action button and popup, the main functionality of the extension.`,
    debugFlag: "transientBug:pages:Popup*"
  },
  {
    namespace: "transientBug",
    description: (
      <p>
        Enables <b>ALL</b> debug logging in the extension. This can be noisy and
        should be used as a last resort.
      </p>
    ),
    debugFlag: "transientBug*"
  }
];

const H2 = styled.h2`
  ${tw`block text-gray-700 text-xl3 font-bold mb-2`}
`;

const Form = styled.form`
  ${tw`mb-4`}
`;

const Fieldset = styled.fieldset`
  ${tw`mb-4`}
`;

const Legend = styled.legend`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

type DevOptionsFormProps = {
  settings: Settings;
  update: SettingsUpdater;
};

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

      <p>
        Here should be a list of endpoints (staging and prod, along with local)
        and the option to input a custom endpoint and client id.
      </p>
    </Fieldset>

    <Fieldset>
      <Legend>Debug Settings</Legend>

      {debugInstances.map((instance: DebugData, idx: number) => (
        <>
          <label
            className={css`
              ${tw`md:w-2/3 block font-bold`}
            `}
            key={idx}
          >
            <input
              className={css`
                ${tw`mr-2 leading-tight`}
              `}
              type="checkbox"
              checked={
                settings.debugFilter
                  ? settings.debugFilter.includes(instance.debugFlag)
                  : false
              }
              onChange={e => {
                debug("setting", instance.namespace, e);
              }}
            />
            <span
              className={css`
                ${tw`text-sm`}
              `}
            >
              {instance.namespace}
            </span>
          </label>
          {instance.description}
        </>
      ))}
    </Fieldset>
  </Form>
);

export default DevOptionsForm;
