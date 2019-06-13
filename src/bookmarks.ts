import { take, uniq, flatten } from "lodash";

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

const logout = () => {
  browser.storage.local.set({ accessToken: "" });
};

const updateCachedTags = async (newTags?: string[]) => {
  const { tags }: { tags?: string[] } = await browser.storage.local.get("tags");

  const mergedTags = (newTags || []).concat(tags || []);
  const allNewTags = take(uniq(flatten(mergedTags)), 200);

  await browser.storage.local.set({ tags: allNewTags });
};

async function save(bookmark: Partial<Bookmark>): Promise<Bookmark | void> {
  const { endpoint, accessToken } = await browser.storage.local.get([
    "endpoint",
    "accessToken"
  ]);

  const { id = "" } = bookmark;

  const method = id ? "PATCH" : "POST";

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
        ...bookmark
      }
    }
  });

  const fetchParams = { method, headers, body };

  debug("sending request", url, body, headers, fetchParams);

  const response = await fetch(url, fetchParams);

  debug("response", response);

  if (response.status === 401) return logout();

  if (!response.ok)
    throw new TypeError(
      `Non-Okay response back from the server: ${response.status}`
    );

  const {
    data: { attributes }
  } = await response.json();

  updateCachedTags(attributes.tags);

  return attributes;
}

export default { save };
