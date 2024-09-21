import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const Results = () => {
  return (
    <SafeAreaView className='bg-white h-full'>
        <View className='h-full flex-col justify-center items-center'>
        <Text>Results</Text>
        <CustomButton title={"Back to home"} containerStyles={"mt-5"} textStyles={"text-2xl"} handlePress={()=> router.push("/(tabs)/home")}/>
        </View>
    </SafeAreaView>
  )
}

export default Results