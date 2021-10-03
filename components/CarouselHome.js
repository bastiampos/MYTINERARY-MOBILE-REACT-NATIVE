import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const CarouselHome = ({data, width, height}) => {

    const renderItem = ({item}) => {
        return (
            // <TouchableOpacity style={styles.slide}>
                <ImageBackground 
                    source={{uri: item.foto}}  
                    style={[styles.slidePicture ,{width, height}]}
                    PlaceholderContent={<ActivityIndicator  color='black' />}
                >
                    <LinearGradient colors={['transparent','rgba(0,0,0,0.5)']} style={styles.slideDetails}>
                        <Text style={styles.slideName}>{item.nombre}</Text>
                    </LinearGradient>
                </ImageBackground>
            // </TouchableOpacity>
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
export default CarouselHome

const styles = StyleSheet.create({
    slide: {
        marginLeft: 20
    },
    slidePicture: {
        borderRadius: 3,
        overflow: 'hidden',
    },
    slideDetails: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        paddingBottom: 2,
        justifyContent: 'flex-end',
    },
    slideName: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white'
    }
})