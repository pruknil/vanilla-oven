import * as React from 'react';
import {View, Text, StyleSheet, StatusBar, Button, ScrollView} from 'react-native';
import {useEffect, useState} from "react";

function HomeScreen({ navigation },props) {


    return (


        <View style={styles.container}>
          <Text>Open up App.js to start working on your app! {props.extraData}</Text>


            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />

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
export default HomeScreen;