import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {Button} from "@rneui/base";
import {useTheme} from "@rneui/themed";
import * as Brightness from "expo-brightness";
import SvgQRCode from 'react-native-qrcode-svg';
const PayQR = ({navigation}) => {
    const [bright, setBright] = useState(0);
    const {state} = useContext(AuthContext);
    const {theme} = useTheme();
    const {hours = 0, minutes = 0, seconds = 0} = {hours: 0, minutes: 15, seconds: 0};
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const [payToken, setPayToken] = useState("xxxx");

    const tick = () => {
        if (hrs === 0 && mins === 0 && secs === 0) {
            reset()
        } else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => {
        setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)])
        setPayToken("ppppp")//<-regen
    }

    useEffect(() => {
        (async (b) => {
            const {status} = await Brightness.requestPermissionsAsync();
            if (status === 'granted') {
                await Brightness.getSystemBrightnessAsync().then((bx) => {
                    setBright(bx)
                    Brightness.setBrightnessAsync(1).then(() => {
                    })
                });
            }
        })();
        return () => {
            if (bright > 0) {
                Brightness.setBrightnessAsync(bright).then();
            }
        }
    }, [bright]);

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerId);
        }
    }, [hrs, mins, secs]);

    return (
        <ScrollView style={{...styles.master, backgroundColor: theme.colors.background}}>
            <Text style={{fontSize: 25, color: theme.colors.black}}>{`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</Text>
            <Button onPress={() => {
                reset()
            }}>Reset</Button>
            <SvgQRCode value={payToken} />
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