import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
// utils
import getColorPresets, { colorPresets, defaultPreset } from '../utils/getColorPresets';
// config
import { defaultSettings, cookiesKey, cookiesExpires } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangeMode: (event: React.ChangeEvent<any>) => {},
  onToggleMode: (event: React.ChangeEvent<any>) => {},
  onChangeDirection: (event: React.ChangeEvent<any>) => {},
  onChangeColor: (event: React.ChangeEvent<any>) => {},
  onToggleStretch: () => {},
  onChangeLayout: (event: React.ChangeEvent<any>) => {},
  onResetSetting: () => {},
  setColor: defaultPreset,
  colorOption: [] as Array<any>,
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

export interface SettingsProviderProps {
  children: React.ReactNode;
  defaultSettings: typeof defaultSettings;
};

function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const {settings, setSettings} = useSettingCookies(defaultSettings);

  const onChangeMode = (event: React.ChangeEvent<any>) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeDirection = (event: React.ChangeEvent<any>) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value,
    });
  };

  const onChangeColor = (event: React.ChangeEvent<any>) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onChangeLayout = (event: React.ChangeEvent<any>) => {
    setSettings({
      ...settings,
      themeLayout: event.target.value,
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        onToggleMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Stretch
        onToggleStretch,
        // Navbar Horizontal
        onChangeLayout,
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };

// ----------------------------------------------------------------------

function useSettingCookies(sett: typeof defaultSettings) {
  const [settings, setSettings] = useState(sett);

  const onChangeSetting = () => {
    Cookies.set(cookiesKey.themeMode, settings.themeMode, { expires: cookiesExpires });

    Cookies.set(cookiesKey.themeDirection, settings.themeDirection, { expires: cookiesExpires });

    Cookies.set(cookiesKey.themeColorPresets, settings.themeColorPresets, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeLayout, settings.themeLayout, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeStretch, JSON.stringify(settings.themeStretch), {
      expires: cookiesExpires,
    });
  };

  useEffect(() => {
    onChangeSetting();
  }, [settings]);

  return {settings, setSettings};
}
