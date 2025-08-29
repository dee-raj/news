import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppProvider from './context/AppContext';
import { NewsProvider } from './context/NewsContext';
import MainTabNavigator from './navigation/MainTabNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NewsProvider>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </NewsProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
