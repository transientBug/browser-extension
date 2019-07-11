/* global browser */

import debugFactory from "./debug";
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
  constructor(...args: any[]) {
    super(...args);

    Error.captureStackTrace(this, APIError);
  }
}

class AuthError extends Error {
  constructor(...args: any[]) {
    super(...args);

    Error.captureStackTrace(this, AuthError);
  }
}

// TODO: Abstract sending a request out into a common function both of these can use
async function save(bookmark: Partial<Bookmark>): Promise<Bookmark> {
  // TODO: refactor out the need for browser here
  const { endpoint, accessToken } = await browser.storage.local.get([
    "endpoint",
    "accessToken"
  ]);

  const method = "POST";

  const url = `${endpoint}/api/v1/bookmarks`;

  const headers = new Headers({
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`
  });

  const body = JSON.stringify({
    data: {
      type: "bookmark",
      attributes: {
        ...bookmark
      }
    }
  });

  const fetchParams = { method, headers, body };

  debug("sending request", url, body, headers, fetchParams);

  const response = await fetch(url, fetchParams);

  debug("response", response);

  if (response.status === 401) throw new AuthError(`Extension unauthorized`);

  if (!response.ok)
    throw new APIError(
      `Non-Okay response back from the server: ${response.status}`
    );

  const json = await response.json();

  debug("response json", json);

  const {
    data: { attributes, id }
  } = json;

  return { ...attributes, id };
}

async function update(
  id: string | number,
  bookmark: Partial<Bookmark>
): Promise<Bookmark> {
  // TODO: refactor out the need for browser here
  const { endpoint, accessToken } = await browser.storage.local.get([
    "endpoint",
    "accessToken"
  ]);

  const method = "PATCH";

  const url = `${endpoint}/api/v1/bookmarks/${id}`;

  const headers = new Headers({
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`
  });

  const body = JSON.stringify({
    data: {
      type: "bookmark",
      attributes: {
        id,
        ...bookmark
      }
    }
  });

  const fetchParams = { method, headers, body };

  debug("sending request", url, body, headers, fetchParams);

  const response = await fetch(url, fetchParams);

  debug("response", response);

  if (response.status === 401) throw new AuthError(`Extension unauthorized`);

  if (!response.ok)
    throw new APIError(
      `Non-Okay response back from the server: ${response.status}`
    );

  const json = await response.json();

  debug("response json", json);

  const {
    data: { attributes }
  } = json;

  return { ...attributes, id };
}

// const request = ({ method, url, accessToken, body }) => {
// }

export default { save, update };
export { APIError, AuthError };
