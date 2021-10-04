import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import CarouselHome from '../components/CarouselHome'
import {FontAwesome } from '@expo/vector-icons';


// const widthScreen = Dimensions.get('window').width

const countries = [
    {nombre: 'Paris', foto: 'https://i.pinimg.com/564x/cd/02/8e/cd028e0e1ae203dd2bda736a14731ef1.jpg'},
    {nombre: 'New York', foto: 'https://i.pinimg.com/564x/bf/c0/d9/bfc0d9140dd9921cb328061704661deb.jpg'},
    {nombre: 'London', foto: 'https://i.pinimg.com/564x/dc/ac/00/dcac005875ceec790780fff8f18b86ad.jpg'},
    {nombre: 'Bangkok', foto: 'https://i.pinimg.com/564x/e2/e4/0b/e2e40b898f0dd1dc3cd7a4586ae40d37.jpg'}
]

const Home = (props) => {
    return (
        <View style={styles.main}>
            <View style={styles.helloContainer}>
                {(props.token && props.userInfo.photoUrl != 'default') && <Image style={styles.picture} source={{uri: props.userInfo.photoUrl}} />}
                {((props.token && props.userInfo.photoUrl == 'default'))  && 
                <FontAwesome style={{marginRight: 10}} name="user-circle-o" size={70} color="rgba(0,0,0,0.2)" />}
                {!props.token && <TouchableOpacity onPress={() => props.navigation.navigate('profilestack')}><FontAwesome style={{marginRight: 10}} name="user-circle-o" size={70} color="rgba(0,0,0,0.2)" /></TouchableOpacity>}
                
                
                {props.token && <View>
                    <Text style={styles.hello}>Hello</Text>
                    <Text style={styles.name}>{props.userInfo.name}</Text>
                </View>}
            </View>
            <ImageBackground source={require('../assets/herohome.png')} style={styles.hero}>
                <View style={styles.buttonHero}>
                    <View>
                        <Text style={styles.explore}>Explore the world</Text>
                        <Text style={styles.find}>Find your next destination</Text>
                    </View>
                    <TouchableOpacity style={styles.goCities} onPress={() => props.navigation.navigate('citiestack')}>
                        <Text style={styles.go}>Go</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.titleCarouselContainer}>
                <Text style={styles.titleCarousel}>Popular MyTineraries</Text>
                <TouchableOpacity><Text style={styles.viewallCarousel} onPress={() => props.navigation.navigate('citiestack')}>View all</Text></TouchableOpacity>
            </View>
            <Text style={styles.detail}>Look these cities you need to visit now!</Text>

            <View style={{paddingHorizontal: 20}}>
                <CarouselHome 
                    data={countries}
                    width={200}
                    height={200}
                />
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

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: 'white',
    },
    helloContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    picture: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 15,
        borderWidth: 4,
        borderColor: 'white',
        overflow: 'hidden'
    },
    hello: {
        fontSize: 14,
        fontWeight: '100',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF8344'
    },
    hero: {
        marginHorizontal: '10%',
        width: '90%',
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonHero: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        marginRight: 35,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    explore: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    find: {
        fontWeight: '100',
        fontSize: 14,
        color: '#ADADAD',
    },
    goCities: {
        backgroundColor: '#FF8344',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    go: {
        color: 'white',
        fontWeight: 'bold'
    },

    titleCarouselContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30
    },
    titleCarousel: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    viewallCarousel: {
        fontWeight: '100',
        fontSize: 14,
    },
    detail: {
        marginHorizontal: '5%',
        marginBottom: 20,
        color: 'gray'
    },
    carousel: {
        marginLeft: '5%',
        flexDirection: 'row',
    }
});