import { View, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'

const NotificationCard = ({title, message}:any) => {
  return (
    <View className='border border-textSecondary/30 rounded-xl p-5 my-2 flex-col space-x-4 items-start'>
        <View className='flex-row space-x-3 items-center'>
            <FontAwesome name="circle" size={16} color="#f97316" />
            <Text className='text-xl font-medium'>{title}</Text>
        </View>           
        <View className='pl-3 mt-2'>
            <Text className='font-light text-base text-justify'>{message}</Text>
        </View>
    </View>
  )
}

export default NotificationCard