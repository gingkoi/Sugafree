import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const noSearchPath = require("../assets/images/noSearch.png")

const EmptyState = ({title, subtitle, buttonTitle, linkPath}:any) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image source={noSearchPath} resizeMode='contain' className='w-[270px] h-[215px]'/>
        <Text className='text-2xl font-bold'>{title}</Text>
        <Text className='text-md'>{subtitle}</Text>

        <CustomButton 
        title={buttonTitle} 
        containerStyles={"w-full my-5"}
        handlePress={()=> router.push(linkPath)}/>
    </View>
  )
}

export default EmptyState