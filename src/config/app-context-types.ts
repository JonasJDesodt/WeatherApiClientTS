import { Theme, lightTheme } from "./themes";
import { Location } from "./weather-api-types";

interface AppLanguageData {
    t: (key: string) => string;
}

interface AppThemeData {
    theme: Theme;
    isDark: boolean;
    setIsDark: (isEnabled: boolean) => void;
}
interface DeviceThemeData {
    isDeviceThemeEnabled: boolean;
    setIsDeviceThemeEnabled: (isEnabled: boolean) => void;
}

interface AppLocationData {
    locationRequest: string | null;
    setLocationRequest: (location: string | null) => void;
    locationResponse: Location | null; 
    setLocationResponse: (location: Location| null) => void;   
}
interface DeviceLocationData {
    isDeviceLocationEnabled: boolean;
    setIsDeviceLocationEnabled: (isEnabled: boolean) => void;
}


export interface AppContextType {
    appTranslationData: AppLanguageData,
    appThemeData: AppThemeData,
    deviceThemeData: DeviceThemeData,
    appLocationData: AppLocationData,
    deviceLocationData: DeviceLocationData
}


export const defaultAppContext : AppContextType = {
    appTranslationData: {
        t: (key: string) => key
    },
    appThemeData: {
        theme: lightTheme,
        isDark: false,
        setIsDark: () => {}
    },
    deviceThemeData: {
        isDeviceThemeEnabled: false,
        setIsDeviceThemeEnabled: () => {}
    },
    appLocationData: {
        locationRequest: null,
        setLocationRequest: () => {},
        locationResponse: null,
        setLocationResponse: () => {}
    },
    deviceLocationData: {
        isDeviceLocationEnabled: false,
        setIsDeviceLocationEnabled: () => {}
    }
}


export interface AppProviderProps {
    children: React.ReactNode;
}  