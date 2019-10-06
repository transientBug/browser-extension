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
