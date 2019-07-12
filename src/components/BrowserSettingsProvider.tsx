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
  tags?: string[];
};

export type SettingsGetter = (keys?: string[]) => Promise<Partial<Settings>>;

export type SettingsSetter = (
  keys: browser.storage.StorageObject
) => void | Promise<void>;

const getSettings: SettingsGetter = keys => browser.storage.local.get(keys);
const setSettings: SettingsSetter = keys => browser.storage.local.set(keys);

const BrowserSettingsContext = createContext<Settings>({});
const BrowserSettingsUpdateContext = createContext<SettingsSetter>(() =>
  Promise.resolve()
);

type useBrowserSettings = () => [Settings, SettingsSetter, boolean];

const useBrowserSettings: useBrowserSettings = () => {
  const [allData, setAllData] = useState<Settings>({});
  const [isInitialized, setIsInitialized] = useState(false);

  const onSettingsChange = useCallback(
    (
      changes: browser.storage.ChangeDict,
      areaName: browser.storage.StorageName
    ) => {
      if (areaName !== "local") return;

      debug("settings changed", changes);

      const data = Object.entries(changes).reduce(
        (memo, [key, value]) => ({ ...memo, [key]: value.newValue }),
        {}
      );

      setAllData({ ...allData, ...data });
    },
    [allData]
  );

  useEffect(() => {
    browser.storage.onChanged.addListener(onSettingsChange);

    return () => {
      browser.storage.onChanged.removeListener(onSettingsChange);
    };
  }, [allData, onSettingsChange]);

  useEffect(() => {
    (async () => {
      setAllData(await getSettings());

      setIsInitialized(true);
    })();
  }, []);

  return [allData, setSettings, isInitialized];
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
  getSettings,
  setSettings,
  useBrowserSettings,
  BrowserSettingsContext,
  BrowserSettingsUpdateContext
};
