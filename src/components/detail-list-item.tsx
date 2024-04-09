import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import { GetTime } from '../utils/datatime-utils';
import { Hour } from '../config/weather-api-types';
import { Theme } from '../config/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DetailListItemProps{
    hour: Hour,
    theme: Theme
}

class DetailListItem extends PureComponent<DetailListItemProps> {
    render() {
      const { hour, theme } = this.props;

      return (
        <ListItem 
          bottomDivider
          containerStyle={{ backgroundColor: theme.foreground }} 
        >
          <ListItem.Content style={[ styles.container ]}>
            <View>
              <ListItem.Title style={{color: theme.text, fontWeight: 'bold'}}>{GetTime(new Date(hour.time))}</ListItem.Title>
              <ListItem.Subtitle style={{color: theme.text}}>{hour.condition.text}</ListItem.Subtitle>
              <Text><Ionicons name="thermometer" style={{fontSize:16}}></Ionicons>{hour.temp_c} °C, {hour.temp_f} °F</Text>
           
            </View>

            <Avatar source={{uri: 'https:' + hour.condition.icon}} />
          </ListItem.Content>
        </ListItem>
      );
    }
}

export default DetailListItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
});