import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View,TouchableOpacity} from 'react-native';
import {Context as AuthContext} from "../../context/AuthContext";
import {Text,useTheme} from "@rneui/themed";
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
const MyCamera = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const { theme } = useTheme();
    const [isPreview, setIsPreview] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [status, requestPermissionMedia] = MediaLibrary.usePermissions();
    const cameraRef = useRef(null)
    if (requestPermission === null) {
        return <View />;
    }
    if (status === null) {
        requestPermissionMedia();
    }
    if (requestPermission === false) {
        return <Text>No access to camera</Text>;
    }
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    function takePicture(){
        onSaveImageAsync().then(r => {})
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

    return (
        <View style={{ flex: 1 }} >
            <Camera
                style={{ flex: 1 }}
                type={type}
                useCamera2Api={true}
                ratio={"16:9"}  ref = {cameraRef}
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
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                //flex: 1,
                                alignSelf: 'flex-start',
                                alignItems: 'left',
                            }}
                            onPress={toggleCameraType}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={takePicture}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: '#fff'
                            }}
                        />
                    </View>
                </View>
            </Camera>
        </View>
    );
};
const handleFacesDetected = ({ faces }) => {
    //console.log(faces)

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

export default MyCamera;