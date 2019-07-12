import React, { createContext } from "react";

import { Settings, SettingsSetter } from "./types";

import useBrowserSettings from "./useBrowserSettings";

const BrowserSettingsContext = createContext<Settings>({});
const BrowserSettingsUpdateContext = createContext<SettingsSetter>(() =>
  Promise.resolve()
);

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
export { BrowserSettingsContext, BrowserSettingsUpdateContext };
