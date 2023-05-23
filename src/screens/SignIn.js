import React, {useState, useContext} from 'react';
import {Icon} from '@rneui/themed';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {Context as AuthContext} from '../context/AuthContext';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const {state, signin} = useContext(AuthContext);

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    return (
        <View style={styles.master}>
            <Text style={styles.header}>Auth Demo</Text>
            <Input
                placeholder="Email"
                value={email}
                leftIcon={<Icon name="envelope" type="font-awesome" size={24} />}
                autoCapitalize='none'
                errorStyle={{ color: 'red' }}
                errorMessage={emailValidError}
                autoCorrect={false}
                onChangeText={value => {
                    setEmail(value);
                    handleValidEmail(value);
                }}
            />
            <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                leftIcon={<Icon name="key" type="font-awesome" size={24} />}
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