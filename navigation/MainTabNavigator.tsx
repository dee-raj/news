import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, IoniconsIconName } from '@react-native-vector-icons/ionicons';

import { RootTabParamList } from '../types/navigation';
import SettingsScreen from '../screens/SettingsScreen';
import { useAppContext } from '../context/AppContext';
import {
    HomeStackNavigator,
    SavedStackNavigator,
    SearchStackNavigator
} from './StackNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator = () => {
    const { theme } = useAppContext();

    const colors = {
        tabBarBackground: theme === 'dark' ? '#1c1c1c' : '#EEE',
        activeTint: '#007AFF',
        inactiveTint: theme === 'dark' ? '#aaa' : 'gray',
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: IoniconsIconName = 'home';

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Search':
                            iconName = 'search-outline';
                            break;
                        case 'Bookmark':
                            iconName = 'bookmark-outline';
                            break;
                        case 'Settings':
                            iconName = 'settings-outline';
                            break;
                        default:
                            iconName = 'alert-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.activeTint,
                tabBarInactiveTintColor: colors.inactiveTint,
                tabBarStyle: {
                    backgroundColor: colors.tabBarBackground,
                    borderTopWidth: 0,
                    elevation: 5,
                    height: 64,
                    paddingBottom: 8,
                    borderTopColor: '#DDD',
                    borderWidth: StyleSheet.hairlineWidth,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Bookmark" component={SavedStackNavigator} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
