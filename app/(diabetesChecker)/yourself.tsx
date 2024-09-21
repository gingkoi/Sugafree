import { View, Text, Image , TouchableOpacity, ScrollView} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import InputForm from '@/components/diabetesChecker/InputForm'

const yourselfPath = require("@/assets/images/diabetesChecker/yourself.jpg")

const Yourself = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1">
        <View className='bg-white h-full w-full flex-col'>
            {/* Back Button */}
            <View className='pb-5 px-4 mt-10'>
            <TouchableOpacity
                      activeOpacity={0.7}
                      className=""
                      onPress={()=>{
                        router.push("/(diabetesChecker)/fit");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={yourselfPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    Tell us more about yourself
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    The combination of your weight and height lets us know your Body Mass  Index or BMI. People with higher BMIs are at a higher risk.
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full'>
                  <InputForm title={"Height"} placeholder={"Enter Height (cm)"}/>
                  <InputForm title={"Weight"} placeholder={"Enter Weight (kg)"}/>
                <CustomButton title={"Next"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> router.push("/(diabetesChecker)/results")}/>
                </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Yourself