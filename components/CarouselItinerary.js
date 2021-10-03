import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const CarouselItinerary = ({data, width, height}) => {

    const renderItem = ({item}) => {
        return (
            <ImageBackground 
                style={[styles.activity, {width, height}]} 
                source={{uri: item.src}} 
                PlaceholderContent={<ActivityIndicator  color='black' />}
            >
                <LinearGradient colors={['transparent','rgba(0,0,0,0.7)']} style={styles.shadow}>
                    <Text style={styles.nameActivity}>{item.name}</Text>
                </LinearGradient>
            </ImageBackground>
        )
    }

    return (
        <Carousel
            layout='default'
            data={data}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={width}
            itemHeight={height}
            renderItem={renderItem}
            activeSlideAlignment='start'
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            slideStyle={{marginRight: 10}}
        />
    )
}

// Dimensions.get('window').width
export default CarouselItinerary

const styles = StyleSheet.create({
    activity: {
        borderRadius: 3,
        marginRight: 15,
        overflow: 'hidden',
    },
    nameActivity: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    shadow: {
        width: '100%',
        height: '100%',
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'relative'
    }
})