import React, {useContext, useState} from 'react';
import {Button, Icon, Input} from '@rneui/themed';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import Helper from "../utils/Helper";

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const {state, signin} = useContext(AuthContext);

    return (
        <View style={styles.master}>
            <Text style={styles.header}>Auth Demo</Text>
            <Input
                placeholder="Email"
                value={email}
                leftIcon={<Icon name="envelope" type="font-awesome" size={24}/>}
                autoCapitalize='none'
                errorStyle={{color: 'red'}}
                errorMessage={emailValidError}
                autoCorrect={false}
                onChangeText={value => {
                    setEmail(value);
                    Helper.validEmail(value, setEmailValidError);
                }}
            />
            <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                leftIcon={<Icon name="key" type="font-awesome" size={24}/>}
                secureTextEntry
            />

            <Button
                title="Login"
                type="solid"
                onPress={() => {
                    signin({email, password});
                }}
            />

            <View style={styles.link}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.text}>Forgot password?</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.link}>
                <Text style={styles.text}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.text}>Sign up Here.</Text>
                </TouchableOpacity>
            </View>
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

export default SignIn;