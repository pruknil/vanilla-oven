import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signout':
            return {token: null, email: ''};
        case 'signin':
        case 'forgot':
        case 'signup':
            return {
                token: action.payload.token,
                email: action.payload.email,
            };
        default:
            return state;
    }
};

const signup = dispatch => {
    return ({email, password}) => {
        console.log('Signup');
    };
};

const forgot = dispatch => {
    return ({email}) => {
        console.log('Forgot');
    };
};

const signin = dispatch => {
    return ({email, password}) => {
        // Do some API Request here
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify({
                    token: password,
                    email: email,
                })
                console.log(jsonValue)
                await AsyncStorage.setItem('@token', jsonValue)
            } catch (e) {
                console.error(e)
            }
        }
        storeData().then(r => {
            dispatch({
                type: 'signin',
                payload: {
                    token: password,
                    email: email,
                },
            });
        })


    };
};

const signout = dispatch => {
    return () => {
        const removeData = async () => {
            try {
                await AsyncStorage.removeItem('@token')
            } catch (e) {
                console.error(e)
            }
        }
        removeData().then(r => {
            dispatch({type: 'signout'});
        })

    };
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup,forgot},
    {token: null, email: ''},
);