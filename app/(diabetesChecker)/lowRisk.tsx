import { View, Text, Image ,ScrollView} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'

const lowRiskPath = require("@/assets/images/diabetesChecker/lowRisk.jpg")

const LowRisk = () => {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1">
        <View className='bg-white h-full w-full flex-col mt-8'>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={lowRiskPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    You’re at low risk for pre diabetes
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    Right now, your risk is low. Keep up the good work by adding more movement to your day and healthier  foods to your diet.{"\n"}{"\n"}Only  your doctor can diagnose diabetes or pre-diabetes. If you are still  concerned you have pre-diabetes, bring a copy of your risk test results  to your doctor and ask for a simple blood test to confirm them.
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

export default LowRisk