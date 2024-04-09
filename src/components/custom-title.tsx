import React, { useContext } from 'react';
import { Text, View, TextStyle } from 'react-native';
import { AppContext } from '../config/app-context';
import { AppContextType } from '../config/app-context-types';

interface CustomTitleProps {
  title: string;
  style?: TextStyle; 
}

const CustomTitle: React.FC<CustomTitleProps> = ({ title, style }) => {
    const { appThemeData } = useContext<AppContextType>(AppContext);
    const { theme } = appThemeData;

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={[{ textAlign: 'left', flexShrink: 1, fontWeight: 'bold', color: theme.text }, style]}>
                {title}
            </Text>
        </View>
    );
};

export default CustomTitle;