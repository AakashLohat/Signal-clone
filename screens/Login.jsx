import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from "react-native-elements"
import { auth } from '../firebase/firebase';
const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])
    const signin = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    }
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                ,
            }}
                style={{ width: 200, height: 200 }} />
            <View style={styles.inputcontainer}>
                <Input placeholder="Email" value={email} autoFocus type="email" onChangeText={(text) => setEmail(text)} />
                <Input placeholder="password" value={password} secureTextEntry type="password" onChangeText={(text) => setPassword(text)} onSubmitEditing={signin} />
            </View>
            <Button containerStyle={styles.button} onPress={signin} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="outline" title="Register" />
            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>
    )
}

export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,

    }
    ,
    inputcontainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});
