import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons'


const Cities = (props) => {

    const [cities, setCities] = useState([])
    const [searchedCities, setSearchedCities] = useState([])

    useEffect(() => {
        fetch('https://mytinerarybe.herokuapp.com/api/cities')
        .then(res => res.json())
        .then(data => {
            setCities(data.response)
            setSearchedCities(data.response)
        })
        .catch(error => console.log(error))
    }, [])

    const searchCity = (e) => {
        setSearchedCities(cities.filter(city => city.name.replace(/ /g, "").toUpperCase().startsWith(e.nativeEvent.text.replace(/ /g, "").toUpperCase())))
    }

    return (
        <View style={styles.main}>
            <ImageBackground  source={require('../assets/heroCities.jpg')} style={styles.hero}>
                <View style={styles.position}>
                    <Text style={styles.textHero}>What'll you do this <Text style={{color: 'orange'}}>summer</Text>?</Text>
                    <View style={styles.searchbarContainer}>
                        <TextInput 
                            style={styles.searchbar} 
                            placeholder='Search a city...' 
                            onChange={(e) => searchCity(e)}
                        />
                        <View style={styles.searchIcon}>
                            <Ionicons name="search-outline" size={24} color="black" />
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={styles.container}>
                <FlatList 
                    style={{paddingBottom: 50}}
                    numColumns='2'
                    data={searchedCities} 
                    keyExtractor={(city) => city._id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity 
                                style={styles.card}
                                onPress={() => {props.navigation.navigate('city', {
                                    id: item._id
                                })}}
                            >
                                <ImageBackground style={styles.pictureCity} source={{uri: `https://mytinerary-bastiampos.herokuapp.com/assets/${item.src}`}} >
                                    <LinearGradient colors={['transparent','rgba(0,0,0,0.5)']} style={styles.shadowCity}>
                                        <Text style={styles.nameCity}>{item.name}</Text>
                                        {/* <View style={styles.countryContainer}>
                                            <Ionicons name="ios-location-outline" size={13} color="white" />
                                            <Text style={styles.country} >{item.country}</Text>
                                        </View> */}
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }} 
                />
            </ScrollView>
        </View>
    )
}

export default Cities

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    hero: {
        paddingTop: 50,
        height: 200,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    position: {
        position: 'absolute',
        top: '88%',
        backgroundColor: 'transparent'
    },
    textHero: {
        paddingLeft: 25,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    searchbarContainer: {
        zIndex: 200,
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row',
        width: '84%',
        marginHorizontal: '7.2%',
        paddingHorizontal: '3%',
        height: 60,
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchbar: {
        marginLeft: 10,
        fontSize: 18,
        width: '80%',
        // backgroundColor: 'green'
    },
    searchIcon: {
        width: 40,
        backgroundColor: '#f0f0f0',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    container: {
        width: '100%',
        paddingHorizontal: '7.%',
        paddingTop: 40,
        zIndex: -1,
        
    },
    card: {
        margin: 10
    },
    pictureCity: {
        width: 160,
        height: 160,
        borderRadius: 3,
        overflow: 'hidden',
    },
    shadowCity: {
        // backgroundColor: 'rgba(1,1,1,0.2)',
        width: '100%',
        height: '100%',
        padding: 10,
        justifyContent: 'flex-end'
    },
    nameCity: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    countryContainer: {
        flexDirection: 'row'
    },
    countryIcon: {

    },
    country: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'normal'
    },
});