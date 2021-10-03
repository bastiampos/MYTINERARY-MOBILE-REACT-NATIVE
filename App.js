import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'

import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import BottomNavigator from './navigation/MainNavBottom'
import rootReducer from './redux/reducers/rootReducer'

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
});
