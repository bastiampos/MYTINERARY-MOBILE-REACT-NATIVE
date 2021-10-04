import React from "react";
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import {Ionicons, FontAwesome, Entypo, FontAwesome5} from '@expo/vector-icons'

const UserProfile = (props) => {
    return (
        <View style={{flex: 1}}>
            <ImageBackground 
                style={styles.cover} 
                source={{uri: 'https://cdn.dribbble.com/users/648922/screenshots/11116609/media/ac4f50c9153870cef4bb744418fca8ab.png?compress=1&resize=1200x900'}}
            ></ImageBackground>
            <View style={styles.coverContainer}>
                <View style={styles.nameContainer}>
                    <View style={styles.pictureContainer}>
                        {(!props.token || (props.token && props.userInfo.photoUrl == 'default'))  && <FontAwesome style={styles.iconDefault} name="user-circle-o" size={110} color="rgba(0,0,0,0.2)" />}
                        {(props.token && props.userInfo.photoUrl != 'default') && <ImageBackground style={styles.picture} source={{uri: props.userInfo.photoUrl }}></ImageBackground>}
                    </View>
                    {props.token && <View style={{marginTop: '15%'}}>
                        <Text style={styles.name}>{props.userInfo.name} {props.userInfo.lastname}</Text>
                        <Text style={styles.username}>@{props.userInfo.username}</Text>
                    </View>}
                </View>
                <Text style={styles.title}>Favorite MyTineraries</Text>
                <Text style={{color: 'gray'}}>See all your saved itineraries</Text>
            </View>

            {!props.token && 
                <View>
                    <View 
                        style={[styles.nohaveItineraries, {marginBottom: 20}]}
                    >
                        <Entypo name="emoji-sad" size={34} color="gray" />
                        <Text style={styles.textNohave}>You are'nt logged, please sign in to watch your profile</Text>
                    </View>

                    <TouchableOpacity style={styles.button} 
                    onPress={() => props.navigation.navigate('signin')}
                    >
                    <Text style={styles.text}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={() => props.navigation.navigate('signup')}
                    >
                    <Text style={styles.text}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            }

            {props.token && 
                <TouchableOpacity 
                    style={styles.nohaveItineraries} 
                    onPress={() => props.navigation.navigate('citiestack')}
                >
                    <Entypo name="emoji-sad" size={34} color="gray" />
                    <Text style={styles.textNohave}>You haven't saved itineraries yet, click here to discover thems</Text>
                </TouchableOpacity>
            }


            {(props.token) && <ScrollView style={{paddingHorizontal: 20}}>
            
            </ScrollView>}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.authReducer.userInfo,
        token: state.authReducer.token
    }
}

export default connect(mapStateToProps)(UserProfile)


const styles = StyleSheet.create({
    coverContainer: {
        padding: 20,
    },
    cover: {
        height: 100,
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        position: 'relative',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-20%',
        marginBottom: '5%'
    },
    pictureContainer: {
        height: 120,
        width: 120,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 4,
        marginRight: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    itinerary: {
        width: 220,
        marginRight: '5%',
        marginTop: 10,
        flexDirection: 'row'
    },
    pictureItinerary: {
        backgroundColor: 'white',
        width: 130,
        height: 130,
        padding: 5,
        position: 'relative',
        marginBottom: 10,
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 10
    },
    favContainer: {
        backgroundColor: 'black',
        borderRadius: 50,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        paddingLeft: 1.1,
        paddingTop: 2.3
    },
    titleItinerary: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detailsItinerary: {
        color: '#515460'
    },
    pricesRating: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    nohaveItineraries: {
        height: 60, 
        backgroundColor: 'rgba(1,1,1, 0.1)',
        borderRadius: 3,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textNohave: {
        flex: 1,
        marginLeft: 10,
        color: 'gray'
    },
    button: {
        marginHorizontal: 20,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 15
    },
    text: {fontWeight: '600', fontSize: 16}
})