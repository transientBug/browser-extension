import { getSettings } from "../components/BrowserSettingsProvider";

import { AuthError, APIError } from "./errors";

import { default as debugFactory } from "./debug";
const debug = debugFactory.extend("request");

interface RequestParameters {
  method: string;
  path: string;
  body: any;
}

// TODO: Wrap in proxy or similar to make a more fluent interface like `request.post`?
// Do I really want to do that or not though ...
const request = async ({
  method,
  path,
  body
}: RequestParameters): Promise<any> => {
  const { endpoint, accessToken } = await getSettings([
    "endpoint",
    "accessToken"
  ]);

  const url = new URL(path, endpoint).toString();

  const headers = new Headers({
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`
  });

  const fetchParams = { method, headers, body: JSON.stringify(body) };

  debug("sending request", url, body, headers, fetchParams);

  const response = await fetch(url, fetchParams);

  debug("response", response);

  if (response.status === 401) throw new AuthError(`Extension unauthorized`);
  if (response.status === 403) throw new AuthError(`User unauthorized`);

  if (!response.ok)
    throw new APIError(
      response.status,
      `Non-Okay response back from the server: ${response.statusText}`
    );

  const json = await response.json();

  debug("response json", json);

  return json;
};

export default request;
