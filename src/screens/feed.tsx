import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import OverviewList from '../components/overview-list';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';

const Feed: React.FC = () => {
    const { appThemeData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <OverviewList />
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});