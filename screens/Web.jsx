import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Webcam from "react-webcam"
import { Caption, RadioButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { v4 as uuid } from "uuid"
import { db, auth, storage } from '../firebase/firebase'

const VideoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
}
const Web = ({ navigation }) => {
    const WebcamRef = useRef(null);

    const Cap = useCallback(() => {
        const imageSrc = WebcamRef.current.getScreenshot();

        navigation.navigate('Imagesection', {
            imageurl: imageSrc
        })


    }, [WebcamRef])


    return (
        <>
            <View style={styles.camera}>
                <Webcam audio={false}
                    height={VideoConstraints.height}
                    ref={WebcamRef}
                    screenshotFormat="image/jpeg"
                    width={VideoConstraints.width}
                    videoConstraints={VideoConstraints}
                />
                <RadioButton onPress={Cap} status='unchecked' />

            </View>


        </>
    )
}

export default Web
const styles = StyleSheet.create({
    camera: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',


    },

})
