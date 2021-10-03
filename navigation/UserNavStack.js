import React from 'react';
import { connect } from 'react-redux'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import UserProfile from '../views/UserProfile';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

const Stack = createNativeStackNavigator()

const UserNavigator = (props) => {
    return (
        <Stack.Navigator >
            <Stack.Screen 
                name='profile' 
                component={UserProfile} 
                options= {{
                    title: 'Profile',
                }}
            />
            {!props.token && <Stack.Screen 
                name='signin' 
                component={SignIn} 
                options= {{
                    title: 'Sign in',
                    headerBackTitleVisible: false
                }}
            />}
            {!props.token && <Stack.Screen 
                name='signup' 
                component={SignUp} 
                options= {{
                    title: 'Sign up',
                    headerBackTitleVisible: false
                }}
            />}
        </Stack.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token
    }
}

export default connect(mapStateToProps)(UserNavigator)