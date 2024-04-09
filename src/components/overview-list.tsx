import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity, Button } from 'react-native';
import OverviewListItem from './overview-list-item';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';
import FetchData from '../utils/fetch-data';
import { Forecastday, Weather } from '../config/weather-api-types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedNavigatorParamList } from '../config/app-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GetApiKey } from '../utils/api-key-store';
import * as ExpoLocation from 'expo-location';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const OverviewList: React.FC = () => {
    const { appThemeData, appLocationData, deviceLocationData, appTranslationData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;
    const { locationRequest, setLocationResponse } = appLocationData;
    const { isDeviceLocationEnabled } = deviceLocationData;
    const { t } = appTranslationData

    const [ days, setDays ] = useState<number>(14);

    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ weather, setWeather ] = useState<Weather | null>(null);
    const [ forecastdays, setForecastdays ] = useState<Forecastday[] | null>(null);
    const [ showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const isFocused = useIsFocused();
    const navigation = useNavigation<NativeStackNavigationProp<FeedNavigatorParamList, 'Feed'>>();

    const onDateTimePickerChanged = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setStartDate(selectedDate); // Schedule the state update
            if(weather){
                setForecastdays(filter(selectedDate, weather)); // Use the selected date directly
            }
        }
    };

    const filter = (date: Date, weatherData: Weather) : Forecastday[] => {
            const startDate = new Date(date.setHours(0, 0, 0, 0)); // Set time to midnight
            const data = weatherData.forecast.forecastday.filter(forecastDay => {
                const forecastDate = new Date(forecastDay.date);
                forecastDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
                return forecastDate >= startDate;
            });

            return data;
    };

    const getLocationPermission = async () : Promise<boolean> => {

            let { status } = await ExpoLocation.getForegroundPermissionsAsync();
            if(status !== 'granted'){


                let { status } = await ExpoLocation.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setError(t('location_permission_not_granted'));

                    return false;
                }
            }

            return true;
    };


    const getData = async() => {
        const key = await GetApiKey();

        if(!key || key.trim() === ''){
          setError(t('no_api_key_provided'));

          return;
        }

        let coords;

        if(isDeviceLocationEnabled) {
            if(!await getLocationPermission()){
                return false;
            }

            let location = await ExpoLocation.getLastKnownPositionAsync();
            if(location === null){
                location = await ExpoLocation.getCurrentPositionAsync({});
            }

          coords = `${location.coords.latitude},${location.coords.longitude}`;
        } else {
          coords = locationRequest;
        }

        if(!coords){
          setError(t('no_location_provided'));

          return;
        }

        let result = await FetchData({
            coords: coords,
            key: key,
            setLocationResponse: setLocationResponse,
            t: t
        });


        if(result.data?.forecast.forecastday){
            setDays(result.data.forecast.forecastday.length);
            setForecastdays(filter(startDate, result.data));
        }


        setWeather(result.data);

        setError(result.error);
        setIsLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            (async () => {
                await getData();
            })();
        }
    }, [isFocused, isDeviceLocationEnabled, locationRequest]);


    if(error !== null){
        return (
            <View style={styles.fallbackContainer}>
                <Text style={{ color: theme.text }}>{error}</Text>
            </View>
        )
    }

    if (forecastdays) {
        return (
                <View style={styles.container} >
                    <View style={[styles.controls, { backgroundColor: theme.foreground}]}>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                        ><Icon name="filter-list" size={30} color={theme.text}/></TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => { setIsLoading(true); await getData();} }
                        ><Icon name="refresh" size={30} color={theme.text} /></TouchableOpacity>

                        {showDatePicker && (<DateTimePicker
                            testID="dateTimePicker"
                            value={startDate}
                            mode={'date'}
                            display="default"
                            minimumDate={new Date()}
                            maximumDate={new Date(new Date().getTime() + (days-1) * 24 * 60 * 60 * 1000)}
                            onChange={onDateTimePickerChanged}
                        />)}
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            data={forecastdays}
                            renderItem={({ item }) => <OverviewListItem forecastday={item} navigation={navigation} theme={theme} />}
                            keyExtractor={(item ) => item.date_epoch.toString()}
                        />
                    </View>
                </View>
        );
    }

    if (isLoading) {
        return (
        <View style={styles.fallbackContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }


    return (
        <View style={styles.fallbackContainer}>
            <Text>No data available.</Text>
        </View>
    );
};

export default OverviewList;

const styles = StyleSheet.create({
    refreshContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    fallbackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    controls: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    container: {
        flexGrow: 1,
        flexShrink: 1
    }
});
