/* global browser */

import debugFactoryOG from "debug";
import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Background");

const debugable = process.env.REACT_APP_DEBUGABLE;

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
  await browser.storage.local.set({
    temporaryInstall: details.temporary
  });

  debugFactoryOG.disable();

  if (!debugable) return;

  await setupDevListener();

  debug("installed", details);
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

  debug("m", m);

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

// TODO: retype away from any here
function onMessageHandler(message: any) {
  switch (message.action) {
    case "save": {
      debug("saving in background", message.data);
      // save(message.data);
      break;
    }

    case "login": {
      login();
      break;
    }

    default: {
      debug("unknown message", message);
      break;
    }
  }
}

const Background = () => {
  browser.runtime.onInstalled.addListener(afterInstall);
  browser.runtime.onMessage.addListener(onMessageHandler);
};

export default Background;
