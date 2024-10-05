import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
const homeScreenPath = require("@/assets/images/home/homeScreen.jpg")

const EmptyGlucoseStatus = () => {
  return (
    <View className='rounded-xl py-5 px-4 space-y-2 bg-primary mx-2 h-[150px] flex-col items-center relative'>
      <Text className='text-white text-3xl font-bold text-center'>Start keeping track on {`\n`}your glucose level</Text>
      <TouchableOpacity 
        activeOpacity={0.7} 
        className='bg-white rounded-2xl w-[150px] flex-row justify-center p-3'
        onPress={()=> router.push("/journal/addJournal")}
        >
        <Text className='text-primary font-bold text-lg'>Start here</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyGlucoseStatus