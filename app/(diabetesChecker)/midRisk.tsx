import { View, Text, Image ,ScrollView} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'

const midRiskPath = require("@/assets/images/diabetesChecker/midRisk.png")

const MidRisk = () => {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1">
        <View className='bg-white h-full w-full flex-col mt-8'>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={midRiskPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    You’re at moderate risk for pre diabetes
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    You may be experiencing signs of insulin resistance, putting you at moderate risk for developing type 2 diabetes. While you might not have prediabetes yet, it's important to take this warning seriously.{"\n"}{"\n"}Consult your doctor for further evaluation and guidance. Don’t wait for symptoms to appear—start making healthy lifestyle changes today to reduce your risk.
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full'>
                <CustomButton title={"Back to Home"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> router.push("/(tabs)/home")}/>
                <CustomButton title={"Retake Test"} containerStyles={"w-full mt-5"} textStyles={"text-2xl text-white"} handlePress={()=> router.push("/(diabetesChecker)/siblings")}/>
                </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default MidRisk