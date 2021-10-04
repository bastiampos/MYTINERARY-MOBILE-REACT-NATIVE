import React from "react";
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import authActions from '../redux/actions/authActions'

const SettingsApp = (props) => {

    // const signOutPress = () => {
    //     props.signOut
    // }

    console.log(props.userInfo)
    return (
        <View style={{flex: 1, padding: 20, paddingBottom: 0}}>
            {props.token && 
                <TouchableOpacity 
                    style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}
                    onPress={() => props.navigation.navigate('profilestack')}
                >
                    {(props.token && props.userInfo.photoUrl != 'default') &&  <Image style={styles.picture} source={{uri: props.userInfo.photoUrl }} />}
                    {(!props.token || (props.token && props.userInfo.photoUrl == 'default'))  && <FontAwesome 
                    style={{marginRight: 10}} name="user-circle-o" size={80} color="rgba(0,0,0,0.2)" />}
                    <View>
                        <Text style={styles.name}>{props.userInfo.name} {props.userInfo.lastname}</Text>
                        <Text style={styles.username}>@{props.userInfo.username}</Text>
                    </View>
                </TouchableOpacity>
            }

            {!props.token &&
            <TouchableOpacity 
                style={[styles.nohaveItineraries, {marginBottom: 20}]}
                onPress={() => props.navigation.navigate('profilestack')}
            >
                <Entypo name="emoji-sad" size={34} color="gray" />
                <Text style={styles.textNohave}>You are'nt logged, please sign in to watch your profile</Text>
            </TouchableOpacity>
            }
            <View style={styles.box}>
                <View>
                    <Text style={styles.title}>Settings</Text>
                    <TouchableOpacity style={styles.button}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="account-circle-outline" size={30} color="black" />
                            <Text style={styles.text}>Account</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialIcons name="privacy-tip" size={30} color="black" />    
                            <Text style={styles.text}>Policy Privacy</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="md-newspaper-outline" size={30} color="black" />
                            <Text style={styles.text}>Terms of use</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="information-circle-outline" size={30} color="black" />
                            <Text style={styles.text}>Information</Text>
                        </View>
                        <MaterialIcons style={{marginRight: -7}} name="keyboard-arrow-down" size={40} color="black" />
                    </TouchableOpacity>
                </View>


                {props.token && 
                    <TouchableOpacity style={styles.button}
                        onPress={() => props.signOut()}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="exit-outline" size={30} color="black" />
                            <Text style={styles.text}>Sign out</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.authReducer.userInfo,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsApp)


const styles = StyleSheet.create({
    nohaveItineraries: {
        height: 60, 
        backgroundColor: 'rgba(1,1,1, 0.1)',
        borderRadius: 3,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textNohave: {
        flex: 1,
        marginLeft: 10,
        color: 'gray'
    },
    box: {
        justifyContent: 'space-between',
        flex: 1,
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 28, 
        marginVertical: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: 'rgba(1,1,1, 0.1)',
        paddingHorizontal: 10,
        borderRadius: 3,
        marginBottom: 10
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
    },
    picture: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})