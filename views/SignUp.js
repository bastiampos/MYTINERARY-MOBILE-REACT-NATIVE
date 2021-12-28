import React, {useState} from 'react';
import { connect } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'

import authActions from '../redux/actions/authActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = (props) => {

    const countries = ['Argentina', 'Brasil', 'Canada', 'Colombia', 'Dinamark', 'Egypt', 'England', 'Finland', 'France', 'Italy', 'Spain', 'United States' ]

    const [dataUser, setDataUser] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        country: '',
        google: false,
        rol: 'user',
        photoUrl: 'default'
    })

    const submit = async () => {
        props.addNewUser(dataUser)
    } 

    const splitFullName = (fullname) => {
        let splitfullname = fullname.split(' ')
        setDataUser({...dataUser, name: splitfullname[0], lastname: splitfullname[1] })
    }

    return (
        <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20, paddingTop: 10}} >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Become a member of MyTinerary</Text>
                <Text style={styles.text}>Share your adventures, meet others' and have each one at hand</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text>Full name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Full name'
                        onChange={(e) => splitFullName(e.nativeEvent.text)}
                    />
                    {props.validationError && <Text style={styles.error}>{props.validationError.firstname} {props.validationError.lastname}</Text>}
                </View>
                <View>
                    <Text>Username</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Username'
                        onChange={(e) => setDataUser({...dataUser, username: e.nativeEvent.text})}                 
                    />
                    {props.validationError && <Text style={styles.error}>{props.validationError.username}</Text>}
                </View>
                <View>
                    <Text>Country</Text>
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem) => setDataUser({...dataUser, country: selectedItem})}
                        defaultButtonText='Select a country'
                        buttonStyle={[{width: '100%'}, styles.input]}
                        rowTextStyle={{ color: "gray", textAlign: "left" }}
                        buttonTextStyle={{ color: "rgba(0,0,0,0.2)", textAlign: "left", fontSize: 14 }}
                        renderDropdownIcon={() => {
                            return (
                              <FontAwesome name="chevron-down" color={"gray"} size={18} />
                            );
                          }}
                    />
                    {props.validationError && <Text style={styles.error}>{props.validationError.country}</Text>}
                </View>
                <View>
                    <Text>Email</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        keyboardType= 'email-address'
                        onChange={(e) => setDataUser({...dataUser, email: e.nativeEvent.text})}                    
                    />
                    {props.validationError && <Text style={styles.error}>{props.validationError.email}</Text>}
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        keyboardType= 'email-address'
                        onChange={(e) => setDataUser({...dataUser, password: e.nativeEvent.text})}                    
                    />
                    {props.validationError && <Text style={styles.error}>{props.validationError.password}</Text>}
                </View>
            </View>
            <TouchableOpacity style={styles.signupButton} onPress={() => submit()}>
                <Text  style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinButton}
                onPress={() => props.navigation.navigate('signin')}
            >
                <Text style={styles.signinText}>Sign in</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        validationError: state.authReducer.validationError,
        authResponse: state.authReducer.authResponse,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    addNewUser: authActions.addNewUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
    error: { marginBottom: 10, color: 'red'},
    titleContainer: {paddingBottom: 20},
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
    },
    textInput: {fontWeight: 'bold', marginLeft: 2},
    signinButton: {
        height: 55,
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    signinText: {fontWeight: '600', fontSize: 18},
    signupButton: {
        backgroundColor: 'black',
        height: 55, 
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    signupText: {fontWeight: '600', fontSize: 18, color: 'white'}
});