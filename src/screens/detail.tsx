import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';
import DetailList from '../components/detail-list';
import { RouteProp } from '@react-navigation/native';
import { FeedNavigatorParamList } from '../config/app-navigator';

type DetailRouteProp = RouteProp<FeedNavigatorParamList, 'Detail'>;

type DetailProps = {
  route: DetailRouteProp;
};

const Detail: React.FC<DetailProps> = ({ route }) => {
    const { appThemeData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;

    const { forecastday } = route.params;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <DetailList forecastday={forecastday} />
        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});