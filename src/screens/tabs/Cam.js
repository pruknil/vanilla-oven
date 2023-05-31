import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Context as AuthContext} from "../../context/AuthContext";
import {Text, useTheme} from "@rneui/themed";
import {Camera, CameraType} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import {Icon} from "@rneui/base";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const {width: windowWidth} = Dimensions.get("window")

const PREVIEW_SIZE = 325
const PREVIEW_RECT = {
    minX: (windowWidth - PREVIEW_SIZE) / 2, minY: 50, width: PREVIEW_SIZE, height: PREVIEW_SIZE
}

const Cam = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const {theme} = useTheme();
    const [isPreview, setIsPreview] = useState(false);
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [status, requestPermissionMedia] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null)
    if (requestPermission === null) {
        return <View/>;
    }
    if (status === null) {
        requestPermissionMedia().then(r => {});
    }
    if (requestPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function takePicture() {
        onSaveImageAsync().then(r => {
        })
    }

    const onSaveImageAsync = async () => {
        try {
            if (!cameraRef) return
            const photo = await cameraRef.current.takePictureAsync();
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            if (photo) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {

    }, []);

    return (<View style={{flex: 1, backgroundColor: theme.colors.background}}>

            <Camera
                style={{flex: 1}}
                type={type}
                useCamera2Api={Platform.OS === 'ios'}
                ratio={"16:9"} ref={cameraRef}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications: FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                }}>


                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                    }}
                >

                    <TouchableOpacity transparent
                                      style={{
                                          flex: 1,
                                          alignSelf: 'flex-start',
                                          alignItems: 'center', //backgroundColor: theme.colors.grey5,
                                      }}
                                      onPress={toggleCameraType}>
                        <MaterialCommunityIcons name="camera-flip" size={40} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity transparent
                                      onPress={takePicture}
                                      style={{
                                          flex: 1,
                                          width: 70,
                                          height: 70,
                                          bottom: 10,
                                          borderRadius: 50, //backgroundColor: theme.colors.grey5,
                                          alignSelf: 'center', //alignItems: 'flex-end',
                                      }}
                    >
                        <Icon name="camera" size={70} color="white"/>
                    </TouchableOpacity>
                </View>

            </Camera>


        </View>);
};

const handleFacesDetected = ({faces}) => {
    //console.log(faces)

};
const styles = StyleSheet.create({
    master: {
        flex: 1, alignSelf: 'stretch', paddingHorizontal: 15,
    }, header: {
        fontSize: 32,
    }, mask: {
        borderRadius: PREVIEW_SIZE / 2,
        height: PREVIEW_SIZE,
        width: PREVIEW_SIZE,
        marginTop: PREVIEW_RECT.minY,
        alignSelf: "center",
        backgroundColor: "white"
    }, circularProgress: {
        width: PREVIEW_SIZE, height: PREVIEW_SIZE, marginTop: PREVIEW_RECT.minY, marginLeft: PREVIEW_RECT.minX
    }, instructions: {
        fontSize: 20, textAlign: "center", top: 25, position: "absolute"
    }, instructionsContainer: {
        flex: 1, justifyContent: "center", alignItems: "center", marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE
    }, action: {
        fontSize: 24, textAlign: "center", fontWeight: "bold"
    }
});

export default Cam;