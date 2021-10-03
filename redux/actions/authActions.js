import axios from 'axios'

// import { connect } from 'react-redux'
// import authActions from './redux/actions/authActions'

const authActions = {
    addNewUser: (user) => {
        return (dispatch, getState) =>  {
            axios.post('https://mytinerary-bastiampos.herokuapp.com/api/user/singup', {...user})
                .then(res => {
                    if(res.data) {
                        dispatch({type: 'AUTH_USER', payload: res.data})
                    }
                })
                .catch(error => console.log(error))
        }
    },
    loginUser: (loginUser) => {
        return (dispatch, getState) => {
            axios.post('https://mytinerary-bastiampos.herokuapp.com/api/user/singin', {...loginUser})
                .then(res => {
                    dispatch({type: 'AUTH_USER', payload: res.data})
                })
                .catch(error => console.log(error))
        }
    },
    signOut: () => {
        return (dispatch, getState) => {
            dispatch({type: 'SIGN_OUT', payload: null})
        }
    }
}

export default authActions

// loginLocalStorage: (token) => {
    //     return (dispatch, getState) => {
    //         axios.get('https://mytinerary-bastiampos.herokuapp.com/api/verifytoken', {
    //             headers: { Authorization: 'Bearer ' + token }
    //         })
    //             .then( res => dispatch({type: 'AUTH_USER_LS', payload: res.data}) )
    //             .catch( error =>  dispatch( {type: 'SIGN_OUT', payload: error }) )
    //     }
    // },