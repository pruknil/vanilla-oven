import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {Avatar, Button, ListItem} from "@rneui/base";
import {useTheme} from "@rneui/themed";
import * as Brightness from "expo-brightness";

const PayQR = ({navigation}) => {
    const [bright, setBright] = useState(0);
    const {state} = useContext(AuthContext);
    const { theme } = useTheme();
    useEffect(() => {
        (async (b) => {
            const { status } = await Brightness.requestPermissionsAsync();
            if (status === 'granted') {
                const b = await Brightness.getSystemBrightnessAsync().then((bx)=>{
                    setBright(bx)
                });
            }
        })();

        return () => {
            if(bright>0) {
                Brightness.setBrightnessAsync(bright).then();
            }
        }
    }, [bright]);

    return (
        <ScrollView style={{...styles.master, backgroundColor: theme.colors.background}}>
            <Text style={{fontSize: 25, color: theme.colors.black}}>{bright}</Text>
            <Button onPress={()=>{Brightness.setBrightnessAsync(1)} }>xxxx</Button>
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
export default PayQR;