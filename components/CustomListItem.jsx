import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"
import { db } from '../firebase/firebase'
const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatmess, setChatmess] = useState([])
    useEffect(() => {
        const unscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setChatmess(snapshot.docs.map((doc) => doc.data())))
        return unscribe
    })

    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded source={{ uri: chatmess?.[0]?.photoURL || "" }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatmess?.[0]?.displayName}:{chatmess?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem
