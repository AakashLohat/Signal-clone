import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { View, Text, Button } from 'react-native'
import { StyleSheet } from 'react-native';
const Imagesection = ({ navigation, route }) => {
    const something = () => {
        navigation.navigate('Home')
    }
    return (
        <View style={styles.imagesec}>
            <Image source={{ uri: route.params.imageurl }}
                style={{ width: 400, height: 400 }} />
            <Button title="close here" color="red" onPress={something} />
        </View>
    )
}

export default Imagesection
const styles = StyleSheet.create({
    imagesec: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',


    },

})
