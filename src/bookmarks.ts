/* global browser */

import debugFactory from "./debug";
import { getSettings } from "./components/BrowserSettingsProvider";
const debug: debug.IDebugger = debugFactory.extend("bookmarks");

export interface Bookmark {
  id?: string | number;
  title: string;
  url: string;
  tags: string[];
  description: string;
  [keys: string]: any;
}

class APIError extends Error {
  status: number = 500;

  constructor(status: number, ...args: any[]) {
    super(...args);

    this.status = status;

    Error.captureStackTrace(this, APIError);
  }
}

class AuthError extends Error {
  constructor(...args: any[]) {
    super(...args);

    Error.captureStackTrace(this, AuthError);
  }
}

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

async function save(bookmark: Partial<Bookmark>): Promise<Bookmark> {
  const method = "POST";

  const path = `/api/v1/bookmarks`;

  const body = {
    data: {
      type: "bookmark",
      attributes: {
        ...bookmark
      }
    }
  };

  const {
    data: { attributes, id }
  } = await request({ method, path, body });

  return { ...attributes, id };
}

async function update(
  id: string | number,
  bookmark: Partial<Bookmark>
): Promise<Bookmark> {
  const method = "PATCH";

  const path = `/api/v1/bookmarks/${id}`;

  const body = {
    data: {
      type: "bookmark",
      attributes: {
        id,
        ...bookmark
      }
    }
  };

  const {
    data: { attributes }
  } = await request({ method, path, body });

  return { ...attributes, id };
}

export default { save, update };
export { APIError, AuthError };
