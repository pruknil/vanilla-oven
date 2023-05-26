import React, {useContext, useEffect} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {useTheme} from "@rneui/themed";

const Profile = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const { theme } = useTheme();
    useEffect(() => {

    }, []);

    return (
        <ScrollView style={{...styles.master, backgroundColor: theme.colors.background}}>
            <Text style={{fontSize: 25, color: theme.colors.black}}>Welcome, {state.email}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    master: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 32,
    },
});
export default Profile;