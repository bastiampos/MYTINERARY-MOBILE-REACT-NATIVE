import React, {useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import {FontAwesome5, Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import axios from 'axios';
import CarouselItinerary from '../components/CarouselItinerary';

const Itinerary = (props) => {

    const [itinerary, setItinerary] = useState({})
    const [activities, setActivities] = useState([])

    useEffect(() => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/itinerary/${props.route.params.id}`)
            .then(res => {
                setItinerary(res.data.response)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect( () => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/activities/${props.route.params.id}`)
                .then( res => {
                    setActivities(res.data.response)
                })
                .catch(error => {
                    console.log(error)
                })     
    }, [])

    console.log(itinerary)

    return (
        <ScrollView style={{flex: 1}}>
            <ImageBackground source={{uri: `https://mytinerary-bastiampos.herokuapp.com/assets/${itinerary.src}`}} style={styles.hero}>
                <LinearGradient colors={['transparent','rgba(0,0,0,0.6)']} style={styles.shadow}>
                    <TouchableOpacity style={styles.favContainer}>
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Image style={styles.pictureAuthor} source={require('../assets/charlie.jpg')} />
                        <View>
                            <Text style={styles.title}>{itinerary.name}</Text>  
                            {itinerary.author && <Text style={styles.nameAuthor}>by {itinerary.author.name} {itinerary.author.lastname}</Text> }
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.hashtagsContainer}>
                    {itinerary.hashtags  && itinerary.hashtags.map( hashtag => <TouchableOpacity><Text>#{hashtag}</Text></TouchableOpacity>)}
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{itinerary.description}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <View style={styles.iconBox}>
                    <View style={styles.iconBg}>
                        <FontAwesome5 name="money-bill-alt" size={24} color="gray" />
                    </View>
                    <Text style={styles.detailsIcon}>{itinerary.price}</Text>
                    <Text style={styles.titleIcon}>Price</Text>
                </View>
                <View style={styles.iconBox}>
                    <View style={styles.iconBg}>
                        <Ionicons name="md-time-outline" size={28} color="gray" />
                    </View>
                    <Text style={styles.detailsIcon}>{itinerary.duration} hours</Text>
                    <Text style={styles.titleIcon}>Duration</Text>
                </View>
                <View style={styles.iconBox}>
                    <View style={styles.iconBg}>
                        <FontAwesome name="heart-o" size={24} color="gray" />
                    </View>
                    <Text style={styles.detailsIcon}>{itinerary.likes ? itinerary.likes.length : 0}</Text>
                    <Text style={styles.titleIcon}>Likes</Text>
                </View>
            </View>
            
            <View style={styles.line}></View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Activities</Text>
                <Text style={styles.description}>Book these experiences for a close-up look at Paris.</Text>
                <View style={styles.activitiesContainer}>
                    <CarouselItinerary
                        data={activities}
                        width={300}
                        height={220}
                    />
                </View>
            </View>
            
            <View style={styles.line}></View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>People are saying</Text>
                <Text style={styles.description}>Lived experiences by other people</Text>
                <View style={styles.comments}>
                    <View style={styles.newComment}>
                        <TextInput 
                            style={styles.commentInput} 
                            placeholder='Write a comment...' 
                        />
                        <TouchableOpacity style={styles.iconInputComment}>
                            <MaterialCommunityIcons name="plus-circle-outline" size={34} color="white" />
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={itinerary.comments} 
                        keyExtractor={(comment) => comment._id}
                        renderItem={({item}) => {
                            // console.log(item)
                            return (
                                <View style={styles.commentContainer}>
                                    <Image style={styles.pictureComment} source={{uri: item.userId.photoUrl}} />
                                    <View>
                                        <Text style={styles.authorComment}>{item.userId.name} {item.userId.lastname}</Text>
                                        <Text style={styles.comment}>{item.comment}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

export default Itinerary

const styles = StyleSheet.create({
    hero: {
        height: 250,
        marginBottom: 15
    },
    shadow: {
        width: '100%',
        height: '100%',
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'relative'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightgreen'
    },
    favContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        right: 15,
        paddingLeft: 1.2,
        paddingTop: 2.1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pictureAuthor: {
        width: '13%',
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    nameAuthor: {
        color: 'white'
    },
    hashtagsContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    hashtag: {
        color: 'gray'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15
    },
    iconBox: {
        alignItems: 'center'
    },
    iconBg: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        marginVertical: 10,
        paddingLeft: 1.5,
        paddingTop: 2
    },
    detailsIcon: {
        fontSize: 20,
        fontWeight: '700'
    },
    titleIcon: {
        color: 'gray'
    },
    descriptionContainer: {
        paddingHorizontal: '5%'
    },
    descriptionTitle: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 2,
    },
    description: {
        color: 'gray'
    },
    line: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: 1,
        marginHorizontal: '5%',
        marginVertical: 30
    },
    activitiesContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    comments: {
        marginVertical: 20,
    },
    commentContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 3,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    pictureComment: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    authorComment: {
        fontWeight: 'bold',
        fontSize: 16
    },
    comment: {
        maxWidth: '92%',
        color: 'gray',
        flex: 1,
    },
    newComment: {
        flexDirection: 'row',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    commentInput: {
        height: '100%',
        width: '85%',
        paddingHorizontal: 20,
    },
    iconInputComment: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 50,
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});