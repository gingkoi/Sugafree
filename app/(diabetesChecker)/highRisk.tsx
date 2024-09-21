import { View, Text, Image , TouchableOpacity, ScrollView} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'

const highRiskPath = require("@/assets/images/diabetesChecker/highRisk.jpg")

const HighRisk = () => {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1">
        <View className='bg-white h-full w-full flex-col mt-8'>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={highRiskPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    You’re at high risk for diabetes
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    You’re likely to have prediabetes and are at high risk for type 2 diabetes.{"\n"}Only your doctor can diagnose diabetes or prediabetes.
                    </Text>
                    <Text className='text-center mt-3 text-base font-bold text-red-500'>Don’t wait for symptoms — take action now.</Text>
                    
                </View>
                {/* Buttons */}
                <View className='w-full'>
                <CustomButton title={"Back to Home"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> router.push("/(tabs)/home")}/>
                <CustomButton title={"Retake Test"} containerStyles={"w-full mt-5"} textStyles={"text-2xl text-white"} handlePress={()=> router.push("/(tabs)/checker")}/>
                </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HighRisk