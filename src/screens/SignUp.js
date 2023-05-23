import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, signin} = useContext(AuthContext);

    return (
        <View style={styles.master}>
            <Text style={styles.header}>SignUp</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    master: {
        padding: 16,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        marginBottom: 18,
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        marginTop: 16,
    },
    link: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default SignUp;