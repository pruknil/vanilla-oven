import React, { useCallback, useState } from 'react';
import { Platform, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AlertModal({state,setAlert}) {
    const handleClose = useCallback(() => {
        setAlert({show:false})
    }, []);

    return (
            <FancyAlert
                style={styles.alert}
                icon={
                    <View style={[ styles.icon, { borderRadius: 32 } ]}>
                        <Ionicons
                            name={Platform.select({ ios: 'information-outline', android: 'information-outline' })}
                            size={36}
                            color="#FFFFFF"
                        />
                    </View>
                }
                onRequestClose={handleClose}
                visible={state.show}
            >
                <View style={styles.content}>
                    <Text style={styles.contentText}>{state.text}</Text>
                    <TouchableOpacity style={styles.btn} onPress={handleClose}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </FancyAlert>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        backgroundColor: '#EEEEEE',
    },
    icon: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C3272B',
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -16,
        marginBottom: 16,
    },
    contentText: {
        textAlign: 'center',
    },
    btn: {
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignSelf: 'stretch',
        backgroundColor: '#C3272B',
        marginTop: 16,

    },
    btnText: {
        color: '#FFFFFF',
        textAlign:'center',
        width: 60
    },
});