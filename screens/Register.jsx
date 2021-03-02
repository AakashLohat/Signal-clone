import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from "react-native-elements"
import { auth } from '../firebase/firebase'
import { Keyboard } from 'react-native'
const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password).then((authuser) => {
            authuser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl,
            })
        }).catch((error) => { alert(error.message) })
    }
    return (
        <KeyboardAvoidingView behavior="padding" onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
            <StatusBar style="light" />
            <Text h1 style={{ marginBottom: 50, fontSize: 30, }}>

                create account</Text>
            <View style={styles.inputcontainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name}
                    onChangeText={(text) => setName(text)} />
                <Input placeholder="email" autoFocus type="email" value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder="password" autoFocus type="password" secureTextEntry value={password}
                    onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Image" autoFocus type="" value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button raised onPress={register} title="Register" style={styles.button} />
        </KeyboardAvoidingView>
    )
}

export default Register
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 4,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 7,
    },
    inputcontainer: {
        width: 300,
    }
});