import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

import Home from '../views/Home'
import SettingsApp from '../views/SettingsApp'
import CitiesNavigator from './CitiesNavStack';
import UserNavigator from './UserNavStack';

const Bottom = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Bottom.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
        }}>
            <Bottom.Screen 
                name='home' 
                component={Home} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons style={{borderTopColor: 'black', borderTopWidth: 1}} name="md-home-outline" size={size} color={color} />
                    ),
                    title: '',
                    headerShown: false,
                }}
            />
            <Bottom.Screen 
                name='citiestack' 
                component={CitiesNavigator} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="city-variant-outline" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Bottom.Screen 
                name='profilestack' 
                component={UserNavigator} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="ios-person-outline" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Bottom.Screen 
                name='settings' 
                component={SettingsApp} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="ios-settings-outline" size={size} color={color} />
                    ),
                    title: 'Settings'
                }}
            />
        </Bottom.Navigator>
    )
}

export default BottomNavigator