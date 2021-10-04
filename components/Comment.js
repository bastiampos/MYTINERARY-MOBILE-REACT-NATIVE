import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {FontAwesome } from '@expo/vector-icons';

const Comment = ({item}) => {


    
    return (
        <View style={styles.commentContainer}>
            {item.userId.photoUrl != 'default' && <Image style={styles.pictureComment} source={{uri: item.userId.photoUrl}} />}

            {item.userId.photoUrl == 'default' && <FontAwesome style={{marginRight: 10}} name="user-circle-o" size={50} color="rgba(0,0,0,0.2)" />}
            <View style={{flex: 1}}>
                <Text style={styles.authorComment}>{item.userId.name} {item.userId.lastname}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
            </View>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
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
        color: 'gray',
    },
})
