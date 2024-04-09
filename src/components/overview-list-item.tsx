import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { GetLocalDate } from '../utils/datatime-utils';
import { Forecastday } from '../config/weather-api-types';
import { Theme } from '../config/themes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedNavigatorParamList } from '../config/app-navigator';


interface OverviewListItemProps{
  forecastday: Forecastday;
  navigation: NativeStackNavigationProp<FeedNavigatorParamList, 'Feed'>;
  theme: Theme
}

class OverviewListItem extends PureComponent<OverviewListItemProps> {
    render() {
      const { forecastday, navigation, theme } = this.props;

      return (
        <ListItem 
          bottomDivider
          onPress={() => navigation.navigate('Detail', { forecastday: forecastday })}
          containerStyle={{ backgroundColor: theme.foreground }}
        >
          <ListItem.Content style={styles.container}>
            <View style={{flexShrink: 1, flexGrow: 1}}>
              <ListItem.Title style={{color: theme.text, fontWeight: 'bold'}}>
                {GetLocalDate(new Date(forecastday.date))}
              </ListItem.Title>
              <ListItem.Subtitle style={{color: theme.text}}>
                {forecastday.day.condition.text}
              </ListItem.Subtitle>
            </View>
            <Avatar source={{uri: 'https:' + forecastday.day.condition.icon}} />
          </ListItem.Content>
        </ListItem>
      );
    }
}

export default OverviewListItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
});