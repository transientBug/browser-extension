/* global browser */

import { take, uniq, flatten } from "lodash";

import { Bookmark } from "../api/types";
import API from "../api";

import {
  getSettings,
  setSettings
} from "../components/BrowserSettingsProvider";

import endpoints from "../endpoints";
import debugFactory, { debugFactoryOG, debugable } from "../debug";
const debug: debug.IDebugger = debugFactory
  .extend("pages")
  .extend("Background");

/**
 * Change event listener for the storage object so that the debug filter can get
 * dynamically enabled and disabled through the options page, if this is a
 * build with that feature enabled. It also tries to restore previous values depending on the settings
 */
async function setupDevListener() {
  const { debugFilter } = await browser.storage.local.get("debugFilter");

  if (debugFilter === "") {
    debug("debugFilter is blank, disabling future messages");
    debugFactoryOG.disable();
  } else {
    debug("Custom debugFilter enabled", debugFilter);
    debugFactoryOG.enable(debugFilter as string);
  }

  const onSettings = async (
    changes: browser.storage.ChangeDict,
    areaName: browser.storage.StorageName
  ) => {
    if (areaName !== "local") return;

    if (!changes.debugFilter) return;

    const {
      debugFilter: { newValue: newDebugFilter }
    } = changes;

    debugFactoryOG.disable();
    if (newDebugFilter !== "") debugFactoryOG.enable(newDebugFilter.join(","));
  };

  browser.storage.onChanged.addListener(onSettings);
}

/**
 *
 * @param details - typed as any because it seems that web-ext-types doesn't
 * include the temporary flag for this listener, and at the end of the day,
 * I am lazy
 */
async function afterInstall(details: any) {
  await setSettings({
    temporaryInstall: details.temporary
  });

  debugFactoryOG.disable();

  if (!debugable) {
    // yoloth
    const production = endpoints.find(e => e.name === "Production");

    if (!production)
      throw new Error(
        "Production endpoint settings not found! This isn't good!"
      );

    await setSettings({
      endpoint: production.endpoint,
      clientId: production.clientId
    });

    return;
  }

  await setupDevListener();

  debug("installed!", details);
}

/**
 * Helper util to extract the access token from the redirected url
 *
 * @param redirectUri The url which the oauth endpoint redirected too, with the
 * full access code in the query string
 */
function extractAcccessToken(redirectUri: string) {
  debug("access token extraction start", redirectUri);

  const m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1) return null;

  debug("redirect uri matchs", m);

  const params = new URLSearchParams(m[1].split("#")[0]);

  debug("access token extraction done", params);

  return params.get("access_token");
}

/**
 * Kicks off the OAuth flow
 *
 * @param endpoint
 * @param clientId
 */
async function login() {
  debug("oauth start");

  const { endpoint, clientId } = await browser.storage.local.get([
    "endpoint",
    "clientId"
  ]);

  const redirectionUrl = encodeURIComponent(browser.identity.getRedirectURL());
  const oauthEndpoint = `${endpoint}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectionUrl}&response_type=token`;

  debug("requesting oauth token", oauthEndpoint);

  const redirectedUrl = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: oauthEndpoint
  });

  debug("returned url", redirectedUrl);

  const accessToken = extractAcccessToken(redirectedUrl);
  await browser.storage.local.set({ accessToken });

  debug("oauth done", accessToken);
}

const mergeTags = (existingTags?: string[], newTags?: string[]) => {
  const mergedTags = (existingTags || []).concat(newTags || []);

  return take(uniq(flatten(mergedTags)), 200);
};

// TODO: retype away from any here
async function onMessageHandler(message: any) {
  debug("got message", message);

  switch (message.action) {
    case "save": {
      const { id, ...bookmark } = message.data as Partial<Bookmark>;
      if (!id) return;

      debug("saving in background", message.data);

      const { tags: existingTags = [] } = await getSettings(["tags"]);

      const bookmarkData = await API.Bookmarks.update(id, bookmark);

      debug(
        "merging and updating local tag storage",
        existingTags,
        bookmarkData.tags
      );
      const tags = mergeTags(existingTags, bookmarkData.tags);
      await setSettings({ tags });
      debug("tags updated", tags);

      break;
    }

    case "login": {
      login();
      break;
    }

    default: {
      debug("ERROR: unknown message", message);
      break;
    }
  }
}

const Background = () => {
  browser.runtime.onInstalled.addListener(afterInstall);
  browser.runtime.onMessage.addListener(onMessageHandler);
};

export default Background;
