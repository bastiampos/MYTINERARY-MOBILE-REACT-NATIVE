import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons, FontAwesome, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons'
import axios from 'axios';

const City = (props) => {

    const [city, setCity] = useState({})

    useEffect(() => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/city/${props.route.params.id}`)
            .then(res => {
                setCity(res.data.response)
            })
            .catch(error => console.log(error))
    }, [])

    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/itineraries/${props.route.params.id}`)
            .then(res => {
                setItineraries(res.data.response)
            })
            .catch(error => console.log(error))
    }, [])

    const sendComment = (itineraryId, newComment) => {
        if(newComment) {
            axios.post(
                `https://mytinerary-bastiampos.herokuapp.com/api/comments/${itineraryId}`, newComment,
                {headers: {Authorization: "Bearer " + props.token}}
            )
                .then( res => {
                    if(res.data.success) {
                        setComments(res.data.response)
                        setNewComment({userId: '', comment: ''})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <ImageBackground  source={require('../assets/newyork.jpg')} style={styles.hero}>
                    <LinearGradient colors={['transparent','rgba(0,0,0,0.7)']} style={styles.shadow}>
                        <Text style={styles.city}>{city.name}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.iconsContainer}>
                    <View  style={styles.iconContainer}>
                        <FontAwesome name="language" size={24} color="#515460" />
                        <Text  style={styles.textIcon}>{city.lenguage}</Text>
                    </View>
                    <View  style={styles.iconContainer}>
                        <MaterialCommunityIcons name="currency-usd-circle-outline" size={24} color="#515460" />
                        <Text  style={styles.textIcon}>{city.currency}</Text>
                    </View>
                    <View  style={styles.iconContainer}>
                        <Ionicons name="ios-location-outline" size={24} color="#515460" />
                        <Text  style={styles.textIcon}>{city.country}</Text>
                    </View>
                </View>
                <View style={styles.doContainer}>
                    <Text style={styles.titleContainer}>About</Text>
                    <Text style={styles.textContainer} >{city.description}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.doContainer}>
                    <Text style={styles.titleContainer}>Do</Text>
                    <Text style={styles.textContainer}>
                        Places to see, ways to wander, and signature experiences that define New York.
                    </Text>
                        <FlatList
                            style={{paddingBottom: 50}}
                            data={itineraries} 
                            keyExtractor={(itinerary) => itinerary._id}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity 
                                        style={styles.itinerary} 
                                        onPress={() => {props.navigation.navigate('itinerary', {itinerary: item})}}
                                    >
                                        <Image source={{uri: `https://mytinerary-bastiampos.herokuapp.com/assets/${item.src}`}} style={styles.pictureItinerary}>
                                        </Image>
                                        <View>
                                        <Text style={styles.titleItinerary}>{item.name}</Text>
                                            <View style={styles.pricesRating}>
                                                {Array.from({ length: item.price }, (_, index) => <FontAwesome5 key={index} style={{marginRight: 3}} name="money-bill-alt" size={14} color="green" /> )}
                                                <Text> • </Text>
                                                <Ionicons name="md-time-outline" size={14} color="black" />
                                                <Text> {item.duration} hours</Text>
                                            </View>
                                            <Text style={styles.detailsItinerary}>{item.description.substring(0, 120)}...</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                </View>
            </ScrollView>
        </View>
    )
}

export default City

const styles = StyleSheet.create({
    line: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: 1,
        marginHorizontal: '5%',
        marginVertical: 30
    },
    hero: {
        paddingTop: 50,
        height: 250,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    city: {
        color: 'orange',
        fontSize: 40,
        fontWeight: 'bold'
    },
    country: {
        fontSize: 16,
        fontWeight: '200',
        color: 'white'
    },
    shadow: {
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'flex-end'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 30
    },
    iconContainer: {
        alignItems: 'center'
    },
    textIcon: {
        fontWeight: '300',
        paddingTop: 5,
        color: '#515460',
    },
    titleContainer: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContainer: {
        color: '#515460'
    },
    doContainer: {
        paddingLeft: '5%',
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
        backgroundColor: 'white',
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
        fontSize: 16,
    },
    detailsItinerary: {
        color: '#515460'
    },
    pricesRating: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    }
});