import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Cities from '../views/Cities'
import City from '../views/City';
import Itinerary from '../views/Itinerary';

const Stack = createNativeStackNavigator()

const CitiesNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='cities' 
                component={Cities} 
                options= {{
                    title: 'Cities',
                    headerBackTitleVisible: false
                }}
            />
            <Stack.Screen 
                name='city' 
                component={City} 
                options= {{
                    title: '',
                    headerBackTitleVisible: false
                }}
            />
            <Stack.Screen 
                name='itinerary' 
                component={Itinerary} 
                options= {{
                    title: '',
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    )
}

export default CitiesNavigator