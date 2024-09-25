import { View, Text, Image , TouchableOpacity} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider'

const doctorPath = require("@/assets/images/diabetesChecker/doctor.jpg")

const Doctor = () => {

  const {setDoctor} = useGlobalContext()

  const nextPage = (score:any)=>{
    setDoctor(score)
    router.push("/(diabetesChecker)/fit")
  }

  return (
    <SafeAreaView>
        <View className='bg-white h-full w-full flex-col'>
            {/* Back Button */}
            <View className='pb-5 px-4 mt-10'>
            <TouchableOpacity
                      activeOpacity={0.7}
                      className=""
                      onPress={()=>{
                        router.push("/(diabetesChecker)/gender");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={doctorPath} resizeMode='contain' className='h-36 w-64'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    Have you ever been diagnosed with high blood pressure?
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    Having high blood pressure contributes to your overall risk for type 2 diabetes.
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full mt-10'>
                <CustomButton title={"Yes"} containerStyles={"w-full"} textStyles={"text-2xl"} handlePress={()=> nextPage(2)}/>
                <CustomButton title={"No"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> nextPage(0)}/>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Doctor