import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {useTheme, useThemeMode} from '@rneui/themed';
import {Avatar, Button, ListItem, makeStyles} from "@rneui/base";

const Account = ({navigation}) => {
    const {state,signout} = useContext(AuthContext);
    const { mode, setMode } = useThemeMode();
    const { theme } = useTheme();
    useEffect(() => {

    }, []);


    return (
        <View style={{...styles.master, backgroundColor: theme.colors.background}}>
            <ListItem  bottomDivider topDivider containerStyle={{ backgroundColor: theme.colors.grey5 }}>
                <Avatar size={"medium"}
                    rounded
                    source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
                    avatarStyle={{ borderWidth: 2, borderColor: theme.colors.grey2,  borderStyle:'solid' }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.black, fontWeight: 'bold' }}>
                        Chris Jackson
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: theme.colors.black }}>
                        Vice Chairman
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: theme.colors.black }} />
            </ListItem>

            <Text style={{...styles.header, color: theme.colors.black}}>Account</Text>
            <Text style={{fontSize: 25, color: theme.colors.black}}>Welcome, {state.email}</Text>
            <Button onPress={() => setMode(mode=='dark'?'light':'dark')} title={mode} />
            <Button onPress={signout} title="Ready to Sign out?" type="clear" />
        </View>
    );
};

const styles = StyleSheet.create({
    master: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        alignSelf: 'stretch',
       // textAlign: 'center',
    },
    header: {
        fontSize: 32,
    },
});

export default Account;