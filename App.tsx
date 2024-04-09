import 'intl-pluralrules';
import { AppProvider } from './src/config/app-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/config/app-navigator';
import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App: React.FC = () =>  {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#000' style='light'/>      
        <NavigationContainer >
          <BottomTabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
