import React, {useEffect, useReducer} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ( reducer, action, defaultValue ) => {
    const Context = React.createContext();
    const getTokenStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@token')
            let token_storage;
            token_storage = JSON.parse(jsonValue);
            if(token_storage !== null) {
                return token_storage
            }
        } catch(e) {
            console.error(e)
        }
    }

    const Provider = ({ children }) => {

        const [ state, dispatch ] = useReducer(reducer, defaultValue);
        useEffect(() => {
            async function checkToken() {
                const tokenStorage = await getTokenStorage()
                if (tokenStorage) {
                    dispatch({
                        type: 'signin',
                        payload: tokenStorage,
                    });
                }
            }
            checkToken()
        }, []);


        const boundActions = {};

        for (let key in action){
            boundActions[key] = action[key](dispatch);
        }

        return(
            <Context.Provider value={{ state, ...boundActions }}>
                { children }
            </Context.Provider>
        )
    };

    return { Context: Context, Provider: Provider };
};