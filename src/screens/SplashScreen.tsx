import * as React from 'react';
import {View, Text, StyleSheet, StatusBar, Button, ScrollView} from 'react-native';
import {useEffect, useState} from "react";

function SplashScreen({ navigation },props) {


    return (


        <View style={styles.container}>
          <Text>Splash Screen</Text>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },  devices: {
        width: '100%'
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20
    },
    device: {
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row'
    },
    button: {
        marginHorizontal: 2
    }
});
export default SplashScreen;