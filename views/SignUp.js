import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp = (props) => {

    const [dataUser, setDataUser] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
    })

    return (
        <ScrollView style={{flex: 1, padding: 20}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Become a member of MyTinerary</Text>
                <Text style={styles.text}>Share your adventures, meet others' and have each one at hand</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text>Full name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Full name'
                        onChange={(e) => inputHandler(e)}
                    />
                </View>
                <View>
                    <Text>Username</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Username'
                        onChange={(e) => inputHandler(e)}
                    />
                </View>
                <View>
                    <Text>Email</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        onChange={(e) => inputHandler(e)}
                    />
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChange={(e) => inputHandler(e)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.signupButton}>
                <Text  style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinButton}
                onPress={() => props.navigation.navigate('signin')}
            >
                <Text style={styles.signinText}>Sign in</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    titleContainer: {paddingVertical: 20},
    title: {fontSize: 24, fontWeight: 'bold'},
    text: {color: 'gray'},
    form: {},
    input: {
        height: 60,
        paddingHorizontal: 20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    textInput: {fontWeight: 'bold', marginLeft: 2},
    signinButton: {
        height: 55,
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signinText: {fontWeight: '600', fontSize: 18},
    signupButton: {
        backgroundColor: 'black',
        height: 55, 
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    signupText: {fontWeight: '600', fontSize: 18, color: 'white'}
});