import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView, View,TouchableOpacity} from 'react-native';
import {Context as AuthContext} from "../../context/AuthContext";
import {Text,useTheme} from "@rneui/themed";
import { Camera, CameraType } from 'expo-camera';
import { CameraFullScreen } from './CameraFullScreen';
import * as FaceDetector from 'expo-face-detector';

const MyCamera = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const { theme } = useTheme();
    const [isPreview, setIsPreview] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (requestPermission === null) {
        return <View />;
    }

    if (requestPermission === false) {
        return <Text>No access to camera</Text>;
    }
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    useEffect(() => {

    }, []);

    return (
        <View style={{ flex: 1 }}>
            <CameraFullScreen type={type}
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
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={toggleCameraType}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </CameraFullScreen>
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