import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
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
        <ScrollView style={{...styles.master, backgroundColor: theme.colors.background}}>
            <ListItem containerStyle={{height: 70, backgroundColor: theme.colors.grey5,borderRadius:10 }} Component={TouchableHighlight} onPress={() => navigation.navigate("Profile")}>
                <Avatar size={55}
                    rounded
                    source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
                    avatarStyle={{ borderWidth: 3, borderColor: theme.colors.grey2, }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.black, fontWeight: 'bold' }}>
                        Chris Jackson
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: theme.colors.black }}>
                        {state.email}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: theme.colors.black }} />
            </ListItem>



            <Button radius={'md'} onPress={() => setMode(mode=='dark'?'light':'dark')} title={mode} />
            <Button
                title="Sign out"
                onPress={signout}
                icon={{
                    name: 'sign-out',
                    type: 'font-awesome',
                    size: 30,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: theme.colors.grey2,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: '100%',
                    marginVertical: 10,
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    master: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        alignSelf: 'stretch',
       // textAlign: 'center',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 32,
    },
});

export default Account;