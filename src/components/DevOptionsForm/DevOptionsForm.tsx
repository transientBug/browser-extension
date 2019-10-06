import React from "react";

import { Settings, SettingsSetter } from "../BrowserSettingsProvider/types";

import Alert from "../Alert";
import DebugFilterList from "../DebugFilterList";
import endpoints from "../../endpoints";

import Form, { Fieldset, Legend, Input } from "../Forms";
import P, { H2 } from "../Text";
import SelectionList, { SelectionItem } from "../SelectionList";
import Grid, { Column } from "../Grid";

interface DevOptionsFormProps {
  settings: Settings;
  update: SettingsSetter;
  redirectURL?: string;
}

const DevOptionsForm: React.FC<DevOptionsFormProps> = ({
  settings,
  update,
  redirectURL
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
    <P>
      Setting the Endpoint URL and Client ID allows you to point the extension
      at a different API (or proxy). You can also choose from a list of
      predefined endpoints to the right, making switching between staging and
      production quick. Changing these will log you out however.
    </P>

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
        <Fieldset>
          <Legend>Predefined Endpoints</Legend>
          <SelectionList>
            {endpoints.map((endpointObj, idx) => (
              <SelectionItem
                onClick={() => {
                  const { endpoint, clientId } = endpointObj;
                  update({ endpoint, clientId, accessToken: "" });
                }}
              >
                {endpointObj.name}
              </SelectionItem>
            ))}
          </SelectionList>
        </Fieldset>
      </Column>
    </Grid>

    <H2>Oauth Settings</H2>
    <Fieldset>
      <Legend>OAuth Redirect URL</Legend>
      <P>Use this to register the extension with transientBug.</P>

      <Input type="text" value={redirectURL} />
    </Fieldset>

    <H2>Debugging & Logging</H2>
    <P>
      These switches toggle the logging within the extension, ranging from
      individudal pages, the API interactions or the whole extension.
    </P>
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
