import { getLocales } from 'expo-localization';

export const GetLocalDate = (date: Date): string => {
  const options : Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };

  return new Date(date).toLocaleDateString(getLocales()[0].languageCode, options);
};

export const GetTime = (date: Date ): string => {
  const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use true for 12-hour format, false for 24-hour format
  };

  return  new Date(date).toLocaleTimeString(getLocales()[0].languageCode, options);
}

export const GetLocaleDateTime = (date: Date | string) : string => new Date(date).toLocaleString(getLocales()[0].languageTag);


