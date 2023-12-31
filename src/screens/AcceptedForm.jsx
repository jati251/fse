/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    Image,
} from 'react-native';
// eslint-disable-next-line
// import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
// eslint-disable-next-line
// import Slider from '@react-native-community/slider';
import { setImage, setImage2 } from '../stores/action'
// import { useCamera } from 'react-native-camera-hooks';

const landmarkSize = 2;

const recordOptions = {
    mute: false,
    maxDuration: 5,
    quality: RNCamera.Constants.VideoQuality['288p'],
};

const initialState = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
        normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
            x: Dimensions.get('window').width * 0.5 - 32,
            y: Dimensions.get('window').height * 0.5 - 32,
        },
    },
    focusDepth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',

    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
};

const renderFaces = faces => (
    <View style={styles.facesContainer} pointerEvents="none">
        {faces.map(renderFace)}
    </View>
);

const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
        key={faceID}
        transform={[
            { perspective: 600 },
            { rotateZ: `${rollAngle.toFixed(0)}deg` },
            { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
            styles.face,
            {
                ...bounds.size,
                left: bounds.origin.x,
                top: bounds.origin.y,
            },
        ]}>
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
);

const renderLandmarksOfFace = (face = {}) => {
    const renderLandmark = position =>
        position && (
            <View
                style={[
                    styles.landmark,
                    {
                        left: position.x - landmarkSize / 2,
                        top: position.y - landmarkSize / 2,
                    },
                ]}
            />
        );
    return (
        <View key={`landmarks-${face.faceID}`}>
            {renderLandmark(face.leftEyePosition)}
            {renderLandmark(face.rightEyePosition)}
            {renderLandmark(face.leftEarPosition)}
            {renderLandmark(face.rightEarPosition)}
            {renderLandmark(face.leftCheekPosition)}
            {renderLandmark(face.rightCheekPosition)}
            {renderLandmark(face.leftMouthPosition)}
            {renderLandmark(face.mouthPosition)}
            {renderLandmark(face.rightMouthPosition)}
            {renderLandmark(face.noseBasePosition)}
            {renderLandmark(face.bottomMouthPosition)}
        </View>
    );
};

const renderLandmarks = (faces = []) => (
    <View style={styles.facesContainer} pointerEvents="none">
        {faces.map(renderLandmarksOfFace)}
    </View>
);

const renderTextBlocks = (textBlocks = []) => (
    <View style={styles.facesContainer} pointerEvents="none">
        {textBlocks.map(renderTextBlock)}
    </View>
);

const renderTextBlock = ({ bounds = {}, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
        <Text
            style={[
                styles.textBlock,
                { left: bounds.origin.x, top: bounds.origin.y },
            ]}>
            {value}
        </Text>
        <View
            style={[
                styles.text,
                {
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                },
            ]}
        />
    </React.Fragment>
);

const renderBarcodes = (barcodes = []) => (
    <View style={styles.facesContainer} pointerEvents="none">
        {barcodes.map(renderBarcode)}
    </View>
);

const renderBarcode = ({ bounds = {}, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
        <View
            style={[
                styles.text,
                {
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                },
            ]}>
            <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
        </View>
    </React.Fragment>
);

export const CameraScreen = (props) => {
    const [
        {
            cameraRef,
            type,
            flash,
            autoFocus,
            focusDepth,
            zoom,
            whiteBalance,
            autoFocusPoint,
            drawFocusRingPosition,
            barcodes,
            ratio,
            cameraState,
            isRecording,
            faces,
            textBlocks,
        },
        {
            toggleFacing,
            toggleFlash,
            toggleAutoFocus,
            setFocusDepth,
            toggleWB,
            touchToFocus,
            toggleCameraState,
            facesDetected,
            textRecognized,
            barcodeRecognized,
            zoomIn,
            zoomOut,
            setIsRecording,
            takePicture,
            recordVideo,
        },
    ] = useCamera(initialState);

    //TODO: [mr] useEffect?
    const canDetectFaces = useMemo(() => cameraState['canDetectFaces'], [
        cameraState,
    ]);
    const canDetectText = useMemo(() => cameraState['canDetectText'], [
        cameraState,
    ]);
    const canDetectBarcode = useMemo(() => cameraState['canDetectBarcode'], [
        cameraState,
    ]);

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={type}
                flashMode={flash}
                autoFocus={autoFocus}
                autoFocusPointOfInterest={autoFocusPoint.normalized}
                zoom={zoom}
                whiteBalance={whiteBalance}
                ratio={ratio}
                focusDepth={focusDepth}
                androidCameraPermissionOptions={{ title: 'Permission to use camera', message: 'We need your permission to use your camera phone' }}
                faceDetectionLandmarks={
                    RNCamera.Constants.FaceDetection.Landmarks
                        ? RNCamera.Constants.FaceDetection.Landmarks.all
                        : null
                }
                onFacesDetected={canDetectFaces ? facesDetected : null}
                onTextRecognized={canDetectText ? textRecognized : null}
                onGoogleVisionBarcodesDetected={
                    canDetectBarcode ? barcodeRecognized : null
                }>
                <View style={StyleSheet.absoluteFill}>
                    <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
                    <TouchableWithoutFeedback onPress={touchToFocus}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View
                    style={{
                        height: 72,
                        backgroundColor: 'transparent',
                        justifyContent: 'space-around',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => toggleFacing()}>
                            <Text style={styles.flipText}> FLIP </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                    </View>
                </View>
                <View style={{ bottom: 0 }}>
                    <View
                        style={{
                            height: 20,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}>
                    </View>
                    <View
                        style={{
                            height: 56,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            alignSelf: 'center',
                        }}>
                        {/* <TouchableOpacity
                            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                            onPress={toggleAutoFocus}>
                            <Text style={styles.flipText}> AF : {autoFocus} </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={[
                                styles.flipButton,
                                styles.picButton,
                                { flex: 1, alignSelf: 'center' },
                            ]}
                            onPress={async () => {
                                try {
                                    //   setIsRecording(true);
                                    const data = await takePicture();
                                    // console.log(props.nav.getParam('data'), 'ini datanyaa dari nav');
                                    if (props.navigation.getParam('data') == 'customer') {
                                        
                                        props.nav.navigate('ServiceEngineerScreen', {
                                            data: {
                                                name: 'customer',
                                                uri: data.uri,
                                                base64 : data.base64
                                            }
                                        })
                                    } else {
                                        props.nav.navigate('ServiceEngineerScreen', {
                                            data : {
                                                name : 'engineer',
                                                uri: data.uri,
                                                base64: data.base64
                                            }
                                        })
                                    }
                                    setIsRecording(false)
                                } catch (e) {
                                    console.warn(e);
                                } finally {
                                    setIsRecording(false);
                                }
                            }}>
                            <Text style={styles.flipText}>TAKE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!!canDetectFaces && renderFaces(faces)}
                {!!canDetectFaces && renderLandmarks(faces)}
                {!!canDetectText && renderTextBlocks(textBlocks)}
                {!!canDetectBarcode && renderBarcodes(barcodes)}
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        zIndex: 150,
        backgroundColor: 'black',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});


const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    setImage,
    setImage2
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)