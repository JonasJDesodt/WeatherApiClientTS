import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DetailListItem from './detail-list-item';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';
import { Forecastday } from '../config/weather-api-types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedNavigatorParamList } from '../config/app-navigator';
import { useNavigation } from '@react-navigation/native';

interface DetailListProps {
    forecastday : Forecastday;
}

const DetailList : React.FC<DetailListProps> = ({ forecastday }) => {
  const { appThemeData, appLocationData } = useContext<AppContextType>(AppContext);
  const { theme } = appThemeData;
  const { locationResponse } = appLocationData;

  const navigation = useNavigation<NativeStackNavigationProp<FeedNavigatorParamList, 'Feed'>>();
  
  useEffect(() => {
    if (locationResponse === null || forecastday === undefined || forecastday === null) {
      navigation.navigate('Feed');
    }
  }, [locationResponse, forecastday, navigation]);


  return (
    <View>   
      <FlatList 
        data={forecastday.hour}
        renderItem={({ item }) => <DetailListItem hour={item} theme={theme} />}
        keyExtractor={(item) => item.time_epoch.toString()}
      />
    </View>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  fallbackContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
  }
});
