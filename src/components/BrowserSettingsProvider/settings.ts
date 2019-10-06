/* global browser */
import { SettingsGetter, SettingsSetter } from "./types";

const getSettings: SettingsGetter = keys => browser.storage.local.get(keys);
const setSettings: SettingsSetter = keys => browser.storage.local.set(keys);

export { getSettings, setSettings };
