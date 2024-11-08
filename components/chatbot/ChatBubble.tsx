import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getProfile } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"

const ChatBubble = ({role, text, onSpeech}:any) => {

  const { user } = useGlobalContext()

  const { data : profile} = useAppwrite(()=>getProfile(user.$id))

  const textRemove = `You are a medical virtual assistant working for SugaFree located specially for Singapore. Your name is Jane. Respond to all messages as if you are a medical virtual assistant named Jane working for SugaFree. Here are some details about me if i asked please refer in the following. My gender is ${profile.gender}, ${profile.age} years old, ${profile.height}cm in height, ${profile.weight}kg in weight, my race is ${profile.race} and my diabetes type: ${profile.type}`;

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
      >{text.includes(textRemove) ? text.replace(textRemove,"") : text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} className='absolute right-1 bottom-1'>
          <Ionicons name="volume-high-outline" size={20} color="black" /> 
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  chatItem:{
    marginBottom:10,
    padding:20,
    borderRadius:10,
    maxWidth:"70%",
    position:"relative",
  },
  userChatItem:{
    alignSelf:"flex-end",
    backgroundColor:"#41D2F2",
  },
  modelChatItem:{
    alignSelf:"flex-start",
    backgroundColor:"#ebebeb",
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