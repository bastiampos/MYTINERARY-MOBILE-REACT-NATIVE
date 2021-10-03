import React, { useState } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import authActions from '../redux/actions/authActions'

const SignIn = (props) => {

    const [user, setUser] = useState({email: '', password: ''})
    const [error, setError] = useState('')

    const submit = async () => {
        if(user.email && user.password) {
            props.logInUser(user)
        } else {
            setError('Please fill your data')
        }
    } 
    
    return (
        <ScrollView style={{flex: 1, padding: 20}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome again</Text>
                <Text style={styles.text}>We're happy to see you</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.textInput}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='example@email.com'
                        onChange={(e) => setUser({...user, email: e.nativeEvent.text})}
                        value={user.email}
                        keyboardType='email-address'
                    />
                </View>
                <View>
                    <Text style={styles.textInput}>Password</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='4+ characters'
                        onChange={(e) => setUser({...user, password: e.nativeEvent.text})}
                        value={user.password}
                        keyboardType='visible-password'
                    />
                </View>
            </View>
            <Text style={styles.error}>{props.authResponse}</Text>
            <TouchableOpacity style={styles.signinButton} onPress={() => submit()}>
                <Text  style={styles.signinText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} 
                onPress={() => props.navigation.navigate('signup')}
            >
                <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        authResponse: state.authReducer.authResponse,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    logInUser: authActions.loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    error: {color: 'red', marginBottom: 10, textAlign: 'center', paddingHorizontal: '10%'},
    titleContainer: {paddingVertical: 20},
    title: {fontSize: 24, fontWeight: 'bold'},
    text: {color: 'gray'},
    form: {},
    input: {
        height: 60,
        paddingHorizontal: 20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    textInput: {fontWeight: 'bold', marginLeft: 2},
    signinButton: {
        backgroundColor: 'black',
        height: 55,
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    signinText: {fontWeight: '600', color: 'white', fontSize: 18},
    signupButton: {
        height: 55, 
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupText: {fontWeight: '600', fontSize: 18}
});