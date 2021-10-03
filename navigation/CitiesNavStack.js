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
                    title: 'Cities'
                }}
            />
            <Stack.Screen 
                name='city' 
                component={City} 
            />
            <Stack.Screen 
                name='itinerary' 
                component={Itinerary} 
            />
        </Stack.Navigator>
    )
}

export default CitiesNavigator