import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from '../screens/feed'
import Settings from '../screens/settings';
import Detail from '../screens/detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetLocalDate } from '../utils/datatime-utils';
import { AppContext } from './app-context';
import CustomTitle from '../components/custom-title';
import { useTranslation } from 'react-i18next';
import { Forecastday } from './weather-api-types';
import { AppContextType } from './app-context-types';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
    const { appThemeData, appLocationData, deviceLocationData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;
    const { locationResponse, locationRequest } = appLocationData;
    const { isDeviceLocationEnabled } = deviceLocationData;

    const { t } = useTranslation(); 

    return (
      <Tab.Navigator 
        screenOptions={{
          tabBarInactiveTintColor: theme.icon,
          tabBarInactiveBackgroundColor: theme.foreground,
          tabBarActiveBackgroundColor: theme.foreground      
        }}
      >
        <Tab.Screen 
            name="FeedNavigator" 
            component={FeedNavigator}
            options={{
                headerTitle: locationResponse ? locationResponse.name : (locationRequest && !isDeviceLocationEnabled ? locationRequest : t('forecast')),
                headerTitleStyle: { color: theme.text },
                headerStyle: {backgroundColor: theme.foreground},
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='cloudy' color={color} size={size} />)
            }}/>

        <Tab.Screen 
            name={"Settings"}
            component={Settings}
            options={{
                headerTitle: t('settings'),
                headerShown: true,
                tabBarShowLabel: false,
                headerTitleStyle: { color: theme.text },
                headerStyle: {backgroundColor: theme.foreground},
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='md-settings' color={color} size={size} />)
            }}/>
      </Tab.Navigator>
    );
};


export type FeedNavigatorParamList = {
    Feed: undefined;
    Detail: { forecastday: Forecastday };  
};

const Stack = createNativeStackNavigator<FeedNavigatorParamList>();

export const FeedNavigator: React.FC = () => {
    const { appThemeData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;

    const { t } = useTranslation(); 

    return (
        <Stack.Navigator initialRouteName="Feed" >
            <Stack.Screen 
                name="Feed" 
                component={Feed}  
                options={{ 
                    headerShown: false, 
                    headerStyle: { backgroundColor: theme.foreground },
                }}/>
            <Stack.Screen 
                name="Detail"
                component={Detail}
                options={({ route }) => ({
                    headerShown: true, 
                    headerTitle: () => <CustomTitle title={route.params.forecastday.date? `${GetLocalDate(new Date(route.params.forecastday.date))}` : `${t('forececast_detail')}`} style={{fontSize: 18, marginRight: 75}}/>,
                    headerStyle: { backgroundColor: theme.foreground },
                    headerTintColor:  theme.text,
                })}/>
        </Stack.Navigator>
    );
};



