import AsyncStorage from '@react-native-async-storage/async-storage';

const locationKey = 'location';

export const fetchLocationRequestAsync = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(locationKey);
    if (value !== null) {
      return value;
    }
    return null;    
  } catch (e)   {
    console.error('Error reading location from AsyncStorage', e);
    return null;
  }
};

export const saveLocationRequestAsync = async (value : string) => {
  try {
     await AsyncStorage.setItem(locationKey, value)
  } catch (e) {
    console.error('Error writing location to AsyncStorage', e);
  }
};


const isDeviceLocationEnabledKey = "is_device_location_enabled";

export const fetchIsDeviceLocationEnabledAsync = async () : Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(isDeviceLocationEnabledKey);
    if (value !== null) {
      return JSON.parse(value);
    }     
    return false;    
  } catch (e) {
    console.error('Error reading isDeviceLocationEnabled from AsyncStorage', e);
    return false;
  }
}

export const saveIsDeviceLocationEnabledAsync = async (isEnabled: boolean) => {
  try {
    await AsyncStorage.setItem(isDeviceLocationEnabledKey, JSON.stringify(isEnabled));
  } catch (e) {
    console.error('Error reading isDeviceLocationEnabled from AsyncStorage', e);
  }
}


const isDeviceThemeEnabledKey = "is_device_theme_enabled";

export const fetchIsDeviceThemeEnabledAsync = async () : Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(isDeviceThemeEnabledKey);
    if (value !== null) {
      return JSON.parse(value);
    }     
    return false;    
  } catch (e) {
    console.error('Error reading isDeviceThemeEnabled from AsyncStorage', e);
    return false;
  }
}

export const saveIsDeviceThemeEnabledAsync = async (isEnabled: boolean) => {
  try {
    await AsyncStorage.setItem(isDeviceThemeEnabledKey, JSON.stringify(isEnabled));
  } catch (e) {
    console.error('Error reading isDeviceThemeEnabled from AsyncStorage', e);
  }
}


const isDarkModeEnabledKey = "is_dark_mode_enabled";

export const fetchIsDarkModeEnabledAsync = async () : Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(isDarkModeEnabledKey);
    if (value !== null) {
      return JSON.parse(value);
    }     
    return false;    
  } catch (e) {
    console.error('Error reading isDarkModeEnabled from AsyncStorage', e);
    return false;
  }
}

export const saveIsDarkModeEnabledAsync = async (isEnabled: boolean) => {
  try {
    await AsyncStorage.setItem(isDarkModeEnabledKey, JSON.stringify(isEnabled));
  } catch (e) {
    console.error('Error reading isDarkModeEnabled from AsyncStorage', e);
  }
}