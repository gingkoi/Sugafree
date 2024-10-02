import {Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

const HomeCard = ({title, imagePath, link}:any) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={()=> router.push(link)} className='flex-grow rounded-2xl bg-white mx-2' style={styles.shadow}>
      <View className='flex-col items-center justify-center h-full space-y-1'>
        <Image source={imagePath} className='h-[125px] w-[125px]'/>
        <Text className='font-medium'>{title}</Text>
      </View>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000', 

    shadowOffset: {width: 0, height: 20}, 
    
    shadowRadius: 2, 
    
    elevation: 8.5, 
  }
})

export default HomeCard