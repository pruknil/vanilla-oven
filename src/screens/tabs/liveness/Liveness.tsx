import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Text, useTheme} from "@rneui/themed";
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {contains, Rect} from "./contains"
import MaskedView from "@react-native-community/masked-view";
import {AnimatedCircularProgress} from "react-native-circular-progress"

const {width: windowWidth} = Dimensions.get("window")

const PREVIEW_SIZE = 325
const PREVIEW_RECT = {
    minX: (windowWidth - PREVIEW_SIZE) / 2,
    minY: 50,
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE
}
type DetectionActions = keyof typeof detections
const detectionsList: DetectionActions[] = [
    "BLINK",
    "TURN_HEAD_LEFT",
    "TURN_HEAD_RIGHT",
    "NOD",
    "SMILE"
]
const initialState = {
    faceDetected: "no" as "yes" | "no",
    faceTooBig: "no" as "yes" | "no",
    detectionsList,
    currentDetectionIndex: 0,
    progressFill: 0,
    processComplete: false
}
const detections = {
    BLINK: {instruction: "Blink both eyes", minProbability: 0.3},
    TURN_HEAD_LEFT: {instruction: "Turn head left", maxAngle: -15},
    TURN_HEAD_RIGHT: {instruction: "Turn head right", minAngle: 15},
    NOD: {instruction: "Nod", minDiff: 1.5},
    SMILE: {instruction: "Smile", minProbability: 0.7}
}
const Liveness = ({navigation}) => {
    //const {state} = useContext(AuthContext);
    const [state, dispatch] = React.useReducer(detectionReducer, initialState)
    const {theme} = useTheme();
    const [isPreview, setIsPreview] = useState(false);
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null)
    const rollAngles = useRef<number[]>([])
    if (requestPermission === null) {
        return <View/>;
    }

    if (requestPermission === false) {
        return <Text>No access to camera</Text>;
    }

    useEffect(() => {
        if (state.processComplete) {
            setTimeout(() => {
                // delay so we can see progress fill aniamtion (500ms)
                navigation.goBack()
            }, 750)
        }
    }, [state.processComplete])
    const onFacesDetected = (result: FaceDetectionResult) => {
        // 1. There is only a single face in the detection results.
        if (result.faces.length !== 1) {
            dispatch({type: "FACE_DETECTED", payload: "no"})
            return
        }

        const face = result.faces[0]

        const faceRect: Rect = {
            minX: face.bounds.origin.x,
            minY: face.bounds.origin.y,
            width: face.bounds.size.width,
            height: face.bounds.size.height
        }

        // 2. The face is fully contained within the camera preview.
        const edgeOffset = 50
        const faceRectSmaller = {
            ...faceRect,
            width: faceRect.width - edgeOffset,
            height: faceRect.height - edgeOffset
        }
        const previewContainsFace = contains({
            outside: PREVIEW_RECT,
            inside: faceRectSmaller
        })
        if (!previewContainsFace) {
            dispatch({type: "FACE_DETECTED", payload: "no"})
            return
        }

        if (state.faceDetected === "no") {
            // 3. The face is not as big as the camera preview.
            const faceMaxSize = PREVIEW_SIZE - 90
            if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
                dispatch({type: "FACE_TOO_BIG", payload: "yes"})
                return
            }

            if (state.faceTooBig === "yes") {
                dispatch({type: "FACE_TOO_BIG", payload: "no"})
            }
        }

        if (state.faceDetected === "no") {
            dispatch({type: "FACE_DETECTED", payload: "yes"})
        }


        const detectionAction = state.detectionsList[state.currentDetectionIndex]

        switch (detectionAction) {
            case "BLINK":
                // Lower probabiltiy is when eyes are closed
                const leftEyeClosed =
                    face.leftEyeOpenProbability <= detections.BLINK.minProbability
                const rightEyeClosed =
                    face.rightEyeOpenProbability <= detections.BLINK.minProbability
                if (leftEyeClosed && rightEyeClosed) {
                    dispatch({type: "NEXT_DETECTION", payload: null})
                }
                return
            case "NOD":
                // Collect roll angle data
                rollAngles.current.push(face.rollAngle)

                // Don't keep more than 10 roll angles
                if (rollAngles.current.length > 10) {
                    rollAngles.current.shift()
                }

                // If not enough roll angle data, then don't process
                if (rollAngles.current.length < 10) return

                // Calculate avg from collected data, except current angle data
                const rollAnglesExceptCurrent = [...rollAngles.current].splice(
                    0,
                    rollAngles.current.length - 1
                )
                const rollAnglesSum = rollAnglesExceptCurrent.reduce((prev, curr) => {
                    return prev + Math.abs(curr)
                }, 0)
                const avgAngle = rollAnglesSum / rollAnglesExceptCurrent.length

                // If the difference between the current angle and the average is above threshold, pass.
                const diff = Math.abs(avgAngle - Math.abs(face.rollAngle))

                // console.log(`
                // avgAngle: ${avgAngle}
                // rollAngle: ${face.rollAngle}
                // diff: ${diff}
                // `)
                if (diff >= detections.NOD.minDiff) {
                    dispatch({type: "NEXT_DETECTION", value: null})
                }
                return
            case "TURN_HEAD_LEFT":
                // Negative angle is the when the face turns left
                if (face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle) {
                    dispatch({type: "NEXT_DETECTION", payload: null})
                }
                return
            case "TURN_HEAD_RIGHT":
                // Positive angle is the when the face turns right
                if (face.yawAngle >= detections.TURN_HEAD_RIGHT.minAngle) {
                    dispatch({type: "NEXT_DETECTION", payload: null})
                }
                return
            case "SMILE":
                // Higher probabiltiy is when smiling
                if (face.smilingProbability >= detections.SMILE.minProbability) {
                    dispatch({type: "NEXT_DETECTION", payload: null})
                }
                return
        }
    }
    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <MaskedView style={StyleSheet.absoluteFill}
                        maskElement={<View style={styles.mask}/>}>
                <Camera
                    style={{flex: 1}}
                    type={type}
                    useCamera2Api={Platform.OS === 'ios'}
                    ratio={"16:9"} ref={cameraRef}
                    onFacesDetected={onFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
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

                    </View>
                    <AnimatedCircularProgress
                        style={styles.circularProgress}
                        size={PREVIEW_SIZE}
                        width={5}
                        backgroundWidth={7}
                        fill={state.progressFill}
                        tintColor="#3485FF"
                        backgroundColor="#e8e8e8"
                    />

                    <View
                        style={{
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                    </View>
                </Camera>
            </MaskedView>
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>
                    {state.faceDetected === "no" &&
                        state.faceTooBig === "no" &&
                        instructionsText.initialPrompt}

                    {state.faceTooBig === "yes" && instructionsText.tooClose}

                    {state.faceDetected === "yes" &&
                        state.faceTooBig === "no" &&
                        instructionsText.performActions}
                </Text>
                <Text style={styles.action}>
                    {state.faceDetected === "yes" &&
                        state.faceTooBig === "no" &&
                        detections[state.detectionsList[state.currentDetectionIndex]]
                            .instruction}
                </Text>
            </View>
        </View>
    );
};

const instructionsText = {
    initialPrompt: "Position your face in the circle",
    performActions: "Keep the device still and perform the following actions:",
    tooClose: "You're too close. Hold the device further."
}

interface Actions {
    FACE_DETECTED: "yes" | "no"
    FACE_TOO_BIG: "yes" | "no"
    NEXT_DETECTION: null
}

interface Action<T extends keyof Actions> {
    type: T
    payload: Actions[T]
}

type PossibleActions = {
    [K in keyof Actions]: Action<K>
}[keyof Actions]

const detectionReducer = (
    state: typeof initialState,
    action: PossibleActions
): typeof initialState => {
    switch (action.type) {
        case "FACE_DETECTED":
            if (action.payload === "yes") {
                return {
                    ...state,
                    faceDetected: action.payload,
                    progressFill: 100 / (state.detectionsList.length + 1)
                }
            } else {
                // Reset
                return initialState
            }
        case "FACE_TOO_BIG":
            return {...state, faceTooBig: action.payload}
        case "NEXT_DETECTION":
            // Next detection index
            const nextDetectionIndex = state.currentDetectionIndex + 1

            // Skip 0 index
            const progressMultiplier = nextDetectionIndex + 1

            const newProgressFill =
                (100 / (state.detectionsList.length + 1)) * progressMultiplier

            if (nextDetectionIndex === state.detectionsList.length) {
                // Passed
                return {...state, processComplete: true, progressFill: newProgressFill}
            }

            // Next detection
            return {
                ...state,
                currentDetectionIndex: nextDetectionIndex,
                progressFill: newProgressFill
            }
        default:
            throw new Error("Unexpected action type.")
    }
}


const styles = StyleSheet.create({
    master: {
        flex: 1,
        alignSelf: 'stretch',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 32,
    },
    mask: {
        borderRadius: PREVIEW_SIZE / 2,
        height: PREVIEW_SIZE,
        width: PREVIEW_SIZE,
        marginTop: PREVIEW_RECT.minY,
        alignSelf: "center",
        backgroundColor: "white"
    },
    circularProgress: {
        width: PREVIEW_SIZE,
        height: PREVIEW_SIZE,
        marginTop: PREVIEW_RECT.minY,
        marginLeft: PREVIEW_RECT.minX
    },
    instructions: {
        fontSize: 20,
        textAlign: "center",
        top: 25,
        position: "absolute"
    },
    instructionsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE
    },
    action: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default Liveness;