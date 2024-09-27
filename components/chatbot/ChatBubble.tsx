import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatBubble = ({role, text, onSpeech}:any) => {
  return (
    <View
    style={[
      styles.chatItem,
      role === "user" ? styles.userChatItem : styles.modelChatItem 
    ]}
    >
      <Text 
      // style={styles.chatText}
      className={role === "user" ? "text-white" : "text-black"}
      >{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} className='absolute right-3 bottom-3'>
          <Ionicons name="volume-high-outline" size={24} color="black" /> 
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  chatItem:{
    marginBottom:10,
    padding:10,
    borderRadius:10,
    maxWidth:"70%",
    position:"relative",
  },
  userChatItem:{
    alignSelf:"flex-end",
    backgroundColor:"#41D2F2"
  },
  modelChatItem:{
    alignSelf:"flex-start",
    backgroundColor:"#ebebeb"
  },
  chatText:{
    fontSize:16,
    color:"#fff"
  },
  speakerIcon:{
    position:"absolute",
    bottom:5,
    right:5
  }


})

export default ChatBubble