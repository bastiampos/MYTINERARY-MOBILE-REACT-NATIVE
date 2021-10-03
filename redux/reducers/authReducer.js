const authReducer = 
    ( state= {token: null, userInfo: {}, authResponse: '', validationError: {}}, action) => {
    
    switch (action.type) {

        case 'AUTH_USER': 
            const {success, response, authResponse, validationError} = action.payload
            if(success) {
                return {
                    ...state,
                    authResponse: authResponse,
                    token: response.token,
                    userInfo: {
                        name: response.name,
                        lastname: response.lastname,
                        username: response.username,
                        photoUrl: response.photoUrl,
                        _id: response._id
                    }
                }
            } 

            if (!success){
                if(authResponse.includes('Email already in use')){
                    return {
                        ...state,
                        authResponse: authResponse,
                        validationError: validationError
                    }
                } else if (authResponse.includes('Incorrect email or password')) {
                    return {
                        ...state,
                        authResponse: authResponse,
                    }
                } else if (authResponse.includes('You created your account with Google')) {
                    return {
                        ...state,
                        authResponse: authResponse,
                    }
                } else if (validationError) {
                    console.log(validationError)
                    return {
                        ...state,
                        authResponse: authResponse,
                        validationError: validationError
                    }
                } else {
                    return {
                        ...state,
                        authResponse: 'Try again in few minutes'
                    }
                }
            }

        case 'SIGN_OUT':
            return {
                ...state,
                token: null,
                userInfo: null,
                authResponse: null
            } 

        default:
            return state
    }
}

export default authReducer