import {Text, View, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

const HomeCard = ({title, imagePath, link}:any) => {
  return (
    <TouchableOpacity activeOpacity={0.7} className='my-1' onPress={()=> router.push(link)}>
        <View className='h-[120px] rounded-xl bg-primary/80 p-5 flex-row items-center justify-between'>
        <Text className='font-black text-3xl text-white'>{title}</Text>
        <Image source={imagePath} resizeMode='cover' className='h-20 w-20'/>
        </View>
  </TouchableOpacity>  
  )
}

export default HomeCard