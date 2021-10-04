import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import {ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import {FontAwesome5, Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'

import CarouselItinerary from '../components/CarouselItinerary';
import Comment from '../components/Comment';

const Itinerary = (props) => {

    const [itinerary, setItinerary] = useState({})
    const [activities, setActivities] = useState([])
    const [newComment, setNewComment] = useState({userId: '', comment: ''})
    const [comments, setComments] = useState([])
    const [renderComments, setRenderComments] = useState(false)
    const [iconLike, setIconLike] = useState('')
    const [likesL, setLikesL] = useState(0)

    useEffect(() => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/itinerary/${props.route.params.itinerary._id}`)
        .then( res => {
            setItinerary(res.data.response)
            setComments(res.data.response.comments.reverse())
            setLikesL(res.data.response.likes.length)

            let likeUserFound = res.data.response.likes.find(like => {
                return like == props.userInfo._id
            })
            
            if(likeUserFound) {
                setIconLike('has')
            } else {
                setIconLike('hasnot')
            }
        })
        .catch(error => {
            console.log(error)
        })   
        setRenderComments(true)
    }, [])

    useEffect( () => {
        axios.get(`https://mytinerarybe.herokuapp.com/api/activities/${props.route.params.itinerary._id}`)
                .then( res => {
                    setActivities(res.data.response)
                })
                .catch(error => {
                    console.log(error)
                })     
    }, [])

    const sendComment = () => {
        if(newComment) {
            axios.post(
                `https://mytinerary-bastiampos.herokuapp.com/api/comments/${props.route.params.itinerary._id}`, newComment,
                {headers: {Authorization: "Bearer " + props.token}}
            )
                .then( res => {
                    if(res.data.success) {
                        setComments(res.data.response.reverse())
                        setNewComment({userId: '', comment: ''})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const pushLike = () => {
        axios.post(
            `https://mytinerary-bastiampos.herokuapp.com/api/likes/${itinerary._id}`, 
            {userId: props.userInfo._id},
            {headers: {Authorization: "Bearer " + props.token}}
        )
            .then( res => {
                setLikesL(likesL + 1)
                setIconLike('has')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const pullLike = () => {
        axios.post(
            `https://mytinerary-bastiampos.herokuapp.com/api/deletelike/${itinerary._id}`, 
            {userId: props.userInfo._id},
            {headers: {Authorization: "Bearer " + props.token}}
        )
            .then( res => {
                setLikesL(likesL - 1)
                setIconLike('hasnot')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <ScrollView style={{flex: 1}}>
            <ImageBackground source={{uri: `https://mytinerary-bastiampos.herokuapp.com/assets/${itinerary.src}`}} style={styles.hero}>
                <LinearGradient colors={['transparent','rgba(0,0,0,0.6)']} style={styles.shadow}>
                    {!props.token && <TouchableOpacity style={[styles.favContainer, {backgroundColor: 'white'}]}>
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>}
                    {(props.token && iconLike == 'hasnot') && 
                    <TouchableOpacity 
                        style={[styles.favContainer, {backgroundColor: 'white'}]}
                        onPress={() => pushLike()}
                    >
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>}
                    {(props.token && iconLike == 'has') && 
                    <TouchableOpacity 
                        style={[styles.favContainer, {backgroundColor: 'black'}]}
                        onPress={() => pullLike()}
                    >
                        <FontAwesome name="heart-o" size={24} color="white" />
                    </TouchableOpacity>}
                    <View style={styles.titleContainer}>
                        {props.route.params.itinerary.author.src && <Image style={styles.pictureAuthor} source={{uri: `https://mytinerary-bastiampos.herokuapp.com/assets/${props.route.params.itinerary.author.src}`}} />}
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
                    <Text style={styles.detailsIcon}>{likesL ? likesL : 0}</Text>
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
                    {props.token && <View style={styles.newComment}>
                        <TextInput 
                            style={styles.commentInput} 
                            placeholder='Write a comment...' 
                            value={newComment.comment}
                            onChange={(e) => setNewComment({userId: props.userInfo._id , comment: e.nativeEvent.text})}
                        />
                        <TouchableOpacity 
                            style={styles.iconInputComment}
                            onPress={() => sendComment()}
                        >
                            <MaterialCommunityIcons name="plus-circle-outline" size={34} color="white" />
                        </TouchableOpacity>
                    </View>}

                    {!props.token && 
                        <TouchableOpacity style={styles.newComment} onPress={() => {props.navigation.navigate('profilestack')}}>
                            <View style={styles.textNoComment}>
                                <Text style={{color: 'gray'}}>You need be logged to comment...</Text>
                            </View>
                            <View style={styles.iconInputComment}>
                                <MaterialCommunityIcons name="plus-circle-outline" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                    }
                    
                    {renderComments && <FlatList
                        data={comments} 
                        keyExtractor={(comment) => comment._id}
                        renderItem={({item}) => <Comment item={item} />}
                    />}

                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.authReducer.userInfo,
        token: state.authReducer.token
    }
}

export default connect(mapStateToProps)(Itinerary)

const styles = StyleSheet.create({
    textNoComment: {
        width: '85%',
        flex: 1,
        paddingLeft: 20,
        paddingTop: 15,
    },
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