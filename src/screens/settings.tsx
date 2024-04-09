import { StyleSheet, View, TextInput, Button, Switch, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import React, { useEffect, useState, useContext } from 'react';
import { SetApiKey, DeleteApiKey, GetApiKey } from '../utils/api-key-store';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';
import * as Device from 'expo-device';
import { saveIsDarkModeEnabledAsync, saveIsDeviceLocationEnabledAsync, saveIsDeviceThemeEnabledAsync, saveLocationRequestAsync } from '../config/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidateApiKey from '../utils/validate-api-key';

const Settings : React.FC = () => {
    const [apiKey, setApiKey] = useState<string>('');
    const [apiKeyIsValid, setApiKeyIsValid ] = useState<boolean>(false);

    const { appThemeData, appLocationData, deviceLocationData, appTranslationData, deviceThemeData } = useContext<AppContextType>(AppContext);
    const { theme, isDark, setIsDark } = appThemeData;
    const { locationRequest, setLocationRequest, setLocationResponse } = appLocationData;
    const { isDeviceLocationEnabled, setIsDeviceLocationEnabled } = deviceLocationData;
    const { isDeviceThemeEnabled, setIsDeviceThemeEnabled } = deviceThemeData;
    const { t } = appTranslationData;

    const toggleDeviceLocationSwitch = async () => {
        setIsDeviceLocationEnabled(!isDeviceLocationEnabled);       
        
        setLocationResponse(null);
    };

    const toggleDeviceThemeSwitch = () => {
        setIsDeviceThemeEnabled(!isDeviceThemeEnabled);
    };

    const toggleDarkThemeSwitch = () => {
        setIsDark(!isDark);
    };

    const SaveApiKey = async () => {
        if(apiKey.trim() !== ''){
            const isValid = await ValidateApiKey(apiKey);
            setApiKeyIsValid(isValid);

            await DeleteApiKey();    

            if(isValid){           
                await SetApiKey(apiKey); // secure-store
            }

            setApiKey(''); // state
        } 
    };

    const Save = async () => { 
        if(locationRequest !== null && locationRequest.trim() !== ''){
            await saveLocationRequestAsync(locationRequest)
        }

        await saveIsDeviceLocationEnabledAsync(isDeviceLocationEnabled);    
        await saveIsDeviceThemeEnabledAsync(isDeviceThemeEnabled);
        await saveIsDarkModeEnabledAsync(isDark);   
    };

    const OnLocationChanged = (value : string) => {
        setLocationRequest(value);
        setLocationResponse(null);
    }

    useEffect(() => {       
        (async() => {
           const result = await GetApiKey();

           if(result !== null){
                setApiKeyIsValid(await ValidateApiKey(result));
           }
        })()
    }, []); 

    return (
        <ScrollView style={[styles.container, {backgroundColor: theme.background }]}>
            <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.foreground }}>
                <ListItem.Content>
                    <ListItem.Title >
                        <View style={styles.titleContainer}>
                            <Text style={{color: theme.text, fontSize: 16}}>{t('weather_api_key')}</Text>    
                            {apiKeyIsValid && (<Icon name="check" size={16} color="green" />)}                  
                            {!apiKeyIsValid && (<Icon name="times" size={16} color="red" />)}      
                        </View>
                    </ListItem.Title>
                    <View style={styles.rowContainer}>
                        <TextInput  
                            onChangeText={setApiKey}
                            value={apiKey}
                            style={{color: theme.text, flexGrow: 1, flexShrink: 1 }}
                            secureTextEntry={true}
                            placeholder={t('enter_your_key')}
                            placeholderTextColor={theme.placeholder} />

                 
                        <Button title={t('validate')} onPress={SaveApiKey}/>
                    </View>
                </ListItem.Content>
            </ListItem>

            <ListItem 
                bottomDivider
                containerStyle={{ backgroundColor: theme.foreground }}>
                <ListItem.Content>
                    <ListItem.Title style={{color: theme.text}}>{t('use_device_location')}</ListItem.Title>
                    <Switch 
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isDeviceLocationEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDeviceLocationSwitch}
                        value={isDeviceLocationEnabled}
                    />
                </ListItem.Content>
            </ListItem>
            
            <ListItem
                bottomDivider
                containerStyle={{ backgroundColor: theme.foreground }}>
                <ListItem.Content
                    style={{opacity: isDeviceLocationEnabled? .5 : 1}}>                
                    <ListItem.Title
                        style={{color: theme.text}}>
                            {t('location')}
                    </ListItem.Title>
                    <TextInput  
                        editable={!isDeviceLocationEnabled}
                        style={{color: theme.text}}
                        onChangeText={OnLocationChanged}
                        value={locationRequest ?? ''}
                        placeholder={t('enter_a_location')} 
                        placeholderTextColor={theme.placeholder} />
                </ListItem.Content>
            </ListItem>

            {Device.osName === 'Android' && Device.platformApiLevel !== null && Device.platformApiLevel > 9 && ( //todo implement web/ios?
                <ListItem 
                    bottomDivider
                    containerStyle={{ backgroundColor: theme.foreground }}>
                    <ListItem.Content>
                    <ListItem.Title style={{color: theme.text}}>{t('use_device_theme')} </ListItem.Title>
                    <Switch 
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isDeviceThemeEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDeviceThemeSwitch}
                        value={isDeviceThemeEnabled}
                    />
                    </ListItem.Content>
                 </ListItem>
            )}

            <ListItem 
                bottomDivider
                containerStyle={{ backgroundColor: theme.foreground }}>
                <ListItem.Content style={{opacity: isDeviceThemeEnabled ? .5 : 1}}>
                    <ListItem.Title style={{color: theme.text}}>{t('darkmode')}</ListItem.Title>
                    <Switch 
                        disabled={isDeviceThemeEnabled}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDarkThemeSwitch}
                        value={isDark}
                    />
                </ListItem.Content>
            </ListItem>

            <ListItem
                containerStyle={{ backgroundColor: theme.foreground }}
                bottomDivider>
                <ListItem.Content style={{ alignItems: 'center' }}> 
                        <Button 
                            title={t('save')}
                            onPress={Save}/>   
                </ListItem.Content>      
            </ListItem>

        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    saveButtonContainer: {
        backgroundColor: 'orange',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

