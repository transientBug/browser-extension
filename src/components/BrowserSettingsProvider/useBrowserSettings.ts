/* global browser */

import { useCallback, useState, useEffect } from "react";

import { getSettings, setSettings } from "./settings";
import { Settings, SettingsSetter } from "./types";

import debugFactory from "../../debug";
const debug: debug.IDebugger = debugFactory
  .extend("components")
  .extend("BrowserSettingsProvider");

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

export default useBrowserSettings;
