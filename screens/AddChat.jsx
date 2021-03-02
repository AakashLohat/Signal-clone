import React, { useLayoutEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase/firebase';
const Addchat = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add new chat"
        })
    }, [])
    const createchat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => navigation.goBack()).catch((error) => { alert(error) })
    }
    return (
        <View style={styles.container}>
            <Input placeholder="Enter a chat name" value={input} onSubmitEditing={createchat} onChangeText={text => setInput(text)} leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />} />
            <Button disabled={!input} onPress={createchat} title="create a chat" />
        </View>
    )
}

export default Addchat
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})
