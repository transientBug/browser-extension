/* global browser */

import React, { createContext, useEffect, useState, useCallback } from "react";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory
  .extend("components")
  .extend("BrowserSettingsProvider");

export type Settings = {
  accessToken?: string;
  debugFilter?: string[];
  temporaryInstall?: boolean;
  endpoint?: string;
  clientId?: string;
};

export type SettingsUpdater = (
  keys: browser.storage.StorageObject
) => Promise<void>;

const BrowserSettingsContext = createContext<Settings>({});
const BrowserSettingsUpdateContext = createContext<SettingsUpdater>(() =>
  Promise.resolve()
);

type useBrowserSettings = () => [Settings, SettingsUpdater];

const useBrowserSettings: useBrowserSettings = () => {
  const [allData, setAllData] = useState<Settings>({});

  const onSettingsChange = (
    changes: browser.storage.ChangeDict,
    areaName: browser.storage.StorageName
  ) => {
    if (areaName !== "local") return;

    debug("settings changed", changes);

    const data = Object.entries(changes).reduce(
      (memo, [key, value]) => ({ ...memo, [key]: value.newValue }),
      {}
    );

    setAllData(data);
  };

  useEffect(() => {
    (async () => {
      setAllData(await browser.storage.local.get());
    })();

    browser.storage.onChanged.addListener(onSettingsChange);

    return () => {
      browser.storage.onChanged.removeListener(onSettingsChange);
    };
  }, []);

  const updater: SettingsUpdater = useCallback(
    async keys => await browser.storage.local.set(keys),
    []
  );

  return [allData, updater];
};

const BrowserSettingsProvider: React.FC = ({ children }) => {
  const [settings, update] = useBrowserSettings();

  return (
    <BrowserSettingsContext.Provider value={settings}>
      <BrowserSettingsUpdateContext.Provider value={update}>
        {children}
      </BrowserSettingsUpdateContext.Provider>
    </BrowserSettingsContext.Provider>
  );
};

export default BrowserSettingsProvider;
export {
  useBrowserSettings,
  BrowserSettingsContext,
  BrowserSettingsUpdateContext
};
