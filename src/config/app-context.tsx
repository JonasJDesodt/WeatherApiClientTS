import React, { createContext, useState, useEffect, FC } from 'react';
import { Appearance, useColorScheme, AppState, View, Text } from 'react-native';
import { lightTheme, darkTheme } from './themes';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { getLocales } from 'expo-localization';
import { defaultAppContext, AppProviderProps, AppContextType } from './app-context-types';
import { fetchIsDarkModeEnabledAsync, fetchIsDeviceLocationEnabledAsync, fetchIsDeviceThemeEnabledAsync, fetchLocationRequestAsync } from './async-storage';
import { Location } from './weather-api-types';

export const AppContext = createContext<AppContextType>(defaultAppContext);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

    const [ isDark, setIsDark ] = useState<boolean>(defaultAppContext.appThemeData.isDark);
    const [ locationRequest, setLocationRequest ] = useState<string | null>(defaultAppContext.appLocationData.locationRequest);
    const [ locationResponse, setLocationResponse ] = useState<Location| null>(defaultAppContext.appLocationData.locationResponse);
    const [ isDeviceLocationEnabled, setIsDeviceLocationEnabled ] = useState<boolean>(defaultAppContext.deviceLocationData.isDeviceLocationEnabled);
    const [ isDeviceThemeEnabled, setIsDeviceThemeEnabled ] = useState<boolean>(defaultAppContext.deviceThemeData.isDeviceThemeEnabled);

    const [isContextReady, setIsContextReady] = useState(false);

    let theme;

    useEffect(() => {
        (async () => {    
            setIsDeviceThemeEnabled(await fetchIsDeviceThemeEnabledAsync());
            setIsDark(await fetchIsDarkModeEnabledAsync());
            setIsDeviceLocationEnabled(await fetchIsDeviceLocationEnabledAsync()); 
            setLocationRequest(await fetchLocationRequestAsync()); 

            setIsContextReady(true);
        })();
 
        const updateLanguage = () => {
            const locale = getLocales()[0].languageCode;
            i18n.changeLanguage(locale);
        }
    
        updateLanguage();
    
        // AppState listener
        const appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                updateLanguage();
            }
        });
    
        // Appearance listener
        const appearanceSubscription = Appearance.addChangeListener(({ colorScheme }) => {
             if(isDeviceThemeEnabled){
                theme = colorScheme === 'dark' ? darkTheme : lightTheme;
            }
        });
    
        return () => {
            appearanceSubscription.remove();
            appStateSubscription.remove();
        }      
    }, []);


    if(isDeviceThemeEnabled){
        theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    } else {
        theme = isDark ? darkTheme : lightTheme;
    }
    
    return (
        <AppContext.Provider value={{ 
            appTranslationData: {
                t
            },
            appLocationData: {
                locationRequest, setLocationRequest, locationResponse, setLocationResponse
            },
            deviceLocationData: {
                isDeviceLocationEnabled, setIsDeviceLocationEnabled
            },
            appThemeData: {
                theme, isDark, setIsDark
            },
            deviceThemeData: {
               isDeviceThemeEnabled, setIsDeviceThemeEnabled 
            } 
        }}>
            {isContextReady ? children : <View style={{backgroundColor:theme.background}}></View>} 
        </AppContext.Provider>
    );
};