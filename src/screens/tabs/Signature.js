import React, {useContext, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import {Context as AuthContext} from '../../context/AuthContext';
import ExpoPixi from 'expo-pixi'
import {Card, Image} from "@rneui/base";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library";
const Signature = ({navigation}) => {
    const {state, signout} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const taskSignatureRef = useRef(null);
    const clearCanvas = () => taskSignatureRef.current?.clear();
    const saveCanvas = async () => {
        const signature_result = await taskSignatureRef.current?.takeSnapshotAsync({
            format: 'png',
            quality: 0.5,
            result: 'data-uri',
        })
        if (signature_result.localUri !== "") {
            //console.log(signature_result.localUri)
            return await new Promise(
                async (expose) => {
                    const rawImage = await FileSystem.readAsStringAsync(signature_result.uri, {encoding: FileSystem.EncodingType.Base64});
                     await MediaLibrary.saveToLibraryAsync(signature_result.localUri).then(
                         expose(`data:image/png;base64,${rawImage}`)
                     );
                }
            );
        } else {
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(signature_result.uri);
            return await new Promise((expose) => {
                fileReaderInstance.onload = () => {
                    const base64data = fileReaderInstance.result?.toString() || null;
                    expose(base64data);
                }
            });
        }
    }
    return (
        <View style={styles.master}>

            <Text style={styles.paragraph}>
                Trying to make ExpoPixi.Signature work:
            </Text>
            <Image
                style={styles.image}
                source={{uri: image}}
            />
            <Card>
                <ExpoPixi.Signature
                    style={{ width: 150, height: 150 }}
                    ref={taskSignatureRef}
                    strokeWidth={3}
                    strokeAlpha={0.5}
                />
            </Card>
            <Button onPress={() => clearCanvas()} title="Reset" />
            <Button
                onPress={() => {
                    saveCanvas().then((image) => setImage(image));
                }}
                title="Save"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    master: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        height: 150,
        width: 150,
    },
});

export default Signature;