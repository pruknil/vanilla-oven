import React, {useContext, useEffect, useState} from 'react';
import {View,  StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import {Context as AuthContext} from '../../../context/AuthContext';
import {useTheme, useThemeMode} from '@rneui/themed';
import {Avatar, Button, ListItem,Text, Icon} from "@rneui/base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

            <Text style={{color: theme.colors.black,fontWeight: 'bold',fontSize: 13,paddingVertical:10,}}>Settings</Text>
            <ListItem containerStyle={{...styles.listItems,backgroundColor: theme.colors.grey5}} Component={TouchableHighlight} onPress={() => {}}>
                <MaterialIcons name="language" size={20} color={theme.colors.black} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.black ,fontSize:12}}>Language</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: theme.colors.black }} />
            </ListItem>
            <ListItem containerStyle={{...styles.listItems,backgroundColor: theme.colors.grey5}} Component={TouchableHighlight} onPress={() => setMode(mode=='dark'?'light':'dark')}>
                <MaterialCommunityIcons name="theme-light-dark" size={20} color={theme.colors.black} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.black ,fontSize:12}}>Dark Mode</ListItem.Title>
                </ListItem.Content>
                <Text style={{ color: theme.colors.black }}>{mode}</Text>
                <ListItem.Chevron style={{ color: theme.colors.black }} />
            </ListItem>
            <ListItem containerStyle={{...styles.listItems,backgroundColor: theme.colors.grey5}} Component={TouchableHighlight} onPress={() => {}}>
                <MaterialCommunityIcons name="key" size={20} color={theme.colors.black} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.black ,fontSize:12}}>Pin & Password</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: theme.colors.black }} />
            </ListItem>
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
    listItems:{
        height: 51,
        borderRadius:10,
    }
});

export default Account;