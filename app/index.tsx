import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Redirect, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '@/context/GlobalProvider'
import Loader from '@/components/Loader'

const onboardingPath = require("../assets/images/onboarding.png")

export default function App() {
const { loading, isLogged } = useGlobalContext();

if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <Loader isLoading={loading}/>
      
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className='w-full'>
          <Image 
          source={onboardingPath}
          className='w-full h-[492px]'
          resizeMode='contain'/>
        </View>
        {/* Onboarding title */}
        <View className='w-full items-center'>
        <View className='w-[356px] h-[160px] pt-4  justify-between'>
          <Text className='text-[36px] font-merriBlack text-black text-center'>
          Healthier Choices Easier Control
          </Text>
          <Text className='text-center font-inter text-textSecondary text-[16px]'>
          Everything you need to manage{"\n"}
          your diabetes effectively
          </Text>
        </View> 
        <View>
        <CustomButton
        title={"Get Started"}
        handlePress={()=> router.push("/sign-in")}
        containerStyles={"mt-10"}/>    
        </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#FFFFFF' style='auto'/>
    </SafeAreaView>
  )
}
