import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types/navigation';

import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import NewsListScreen from '../screens/NewsListScreen';

import NewsDetailScreen from '../screens/details/NewsDetailScreen';
import SavedDetailScreen from '../screens/details/SavedDetailScreen';
import SearchDetailScreen from '../screens/details/SearchDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
    const { theme } = useAppContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#263234ff' : '#EEE',
                    elevation: 12
                },
                headerTintColor: theme === 'dark' ? '#FFF' : '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="News"
                component={NewsListScreen}
                options={{ title: 'Latest News' }}
            />
            <Stack.Screen
                name="Details"
                component={NewsDetailScreen}
                options={{ title: 'Viewing Article' }}
            />
        </Stack.Navigator>
    );
};

export const SavedStackNavigator = () => {
    const { theme } = useAppContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#263234ff' : '#fff',
                    elevation: 12
                },
                headerTintColor: theme === 'dark' ? '#fff' : '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="SavedNews"
                component={SavedScreen}
                options={{ title: 'Saved News' }}
            />
            <Stack.Screen
                name="SavedDetails"
                component={SavedDetailScreen}
                options={{ title: 'Viewing Saved Article' }}
            />
        </Stack.Navigator>
    );
};


export const SearchStackNavigator = () => {
    const { theme } = useAppContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme === 'dark' ? '#263234ff' : '#EEE',
                    elevation: 8
                },
                headerTintColor: theme === 'dark' ? '#fff' : '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="SearchNews"
                component={SearchScreen}
                options={{ title: 'Search News' }}
            />
            <Stack.Screen
                name="SearchDetails"
                component={SearchDetailScreen}
                options={{ title: 'Reading Searched Article' }}
            />
        </Stack.Navigator>
    )
}