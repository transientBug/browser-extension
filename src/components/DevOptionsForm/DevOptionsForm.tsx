import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import { Settings, SettingsSetter } from "../BrowserSettingsProvider/types";

import Alert from "../Alert";
import DebugFilterList from "../DebugFilterList";
import endpoints from "../../endpoints";

import Form, { Fieldset, Legend, Input } from "../Forms";

const H2 = tw.h2`
  block text-gray-700 text-xl3 font-bold mb-2
`;

const Grid = tw.div`flex mb-4`;

const Column = styled.div`
  ${tw`w-1/2`}

  :not(:first-child), :not(:last-child) {
    ${tw`px-1`}
  }

  :first-child {
    ${tw`pr-1`}
  }

  :last-child {
    ${tw`pl-1`}
  }
`;

const ListSelector = tw.ul`flex flex-col`;
const ListSelectorItem = styled.li`
  :first-child {
    ${tw`rounded-t`}
  }

  :last-child {
    ${tw`rounded-b`}
  }
  ${tw`relative -mb-px block border p-4 border-gray hover:bg-gray-100 hover:cursor-pointer`}
`;

interface DevOptionsFormProps {
  settings: Settings;
  update: SettingsSetter;
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
        message: `This build has development settings enabled. Please tread carefully.`
      }}
    </Alert>

    <H2>Endpoint Settings</H2>

    <Grid>
      <Column>
        <Fieldset>
          <Legend>URL</Legend>
          <Input
            type="url"
            value={settings.endpoint}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ endpoint: e.target.value })
            }
            placeholder="Endpoint URL"
          />
        </Fieldset>
        <Fieldset>
          <Legend>OAuth Client ID</Legend>
          <Input
            type="text"
            value={settings.clientId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ clientId: e.target.value })
            }
            placeholder="Client ID"
          />
        </Fieldset>
      </Column>
      <Column>
        <H2>Predefined Endpoints</H2>
        <ListSelector>
          {endpoints.map((endpointObj, idx) => (
            <ListSelectorItem
              onClick={() => {
                const { endpoint, clientId } = endpointObj;
                update({ endpoint, clientId, accessToken: "" });
              }}
            >
              {endpointObj.name}
            </ListSelectorItem>
          ))}
        </ListSelector>
      </Column>
    </Grid>

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
