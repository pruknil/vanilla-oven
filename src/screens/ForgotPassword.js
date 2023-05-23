import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Button, Icon, Input} from "@rneui/themed";
import Helper from "../utils/Helper";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const {state, forgot} = useContext(AuthContext);

    return (
        <View style={styles.master}>
            <Text style={styles.header}>Forgot Password?</Text>
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
                    Helper.validEmail(value,setEmailValidError);
                }}
            />


            <Button
                title="Submit"
                type="solid"
                onPress={() => {
                    forgot({email});
                }}
            />



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

export default ForgotPassword;