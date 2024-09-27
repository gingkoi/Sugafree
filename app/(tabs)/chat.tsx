import { View, Text } from 'react-native'
import React from 'react'
import ChatBot from "@/lib/Chatbot"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'

const Chatbot = () => {
  return (
    <Redirect href={"/chat/chatbotAI"}/>
  )
}

export default Chatbot