import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase/firebase'

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { StyleSheet } from 'react-native'

const Home = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }
    const render = () => {
        navigation.navigate("AddChat")
    }
    React.useEffect(() => {
        const unscribe = db.collection('chats').onSnapshot((snapshot) => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unscribe;
    }, [])
    const webcam = () => {
        navigation.navigate("Webcam")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Lohat",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black", alignSelf: "center", marginRight: 50 },
            headerTintColor: "black",
            headerLeft: () => {
                return (
                    <View style={{ marginLeft: 20 }}>
                        <TouchableOpacity onPress={signOutUser}>

                            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                        </TouchableOpacity>
                    </View>)
            },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
                        <TouchableOpacity >
                            <AntDesign name="camerao" size={24} onPress={webcam} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={render}>
                            <SimpleLineIcons name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                    </View>)
            }
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => {

                    return (<>

                        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                    </>)
                })}


            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})