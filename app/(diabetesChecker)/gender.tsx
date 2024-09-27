import { View, Text, Image , TouchableOpacity} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider'

const genderPath = require("@/assets/images/diabetesChecker/gender.jpg")

const Gender = () => {

  const {gender, setGender} = useGlobalContext()

  const nextPage = (score:any)=>{
    setGender(score)
    router.push("/(diabetesChecker)/doctor")
  }

  return (
    <SafeAreaView className='bg-white'>
        <View className='bg-white h-full w-full flex-col'>
            {/* Back Button */}
            <View className='pb-5 px-4 mt-10'>
            <TouchableOpacity
                      activeOpacity={0.7}
                      className=""
                      onPress={()=>{
                        router.push("/(diabetesChecker)/age");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View>
                    <Image source={genderPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    What is your gender?
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    Men are more likely than women to have undiagnosed prediabetes; one  reason may be that they are less likely to visit their doctors  regularly.
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full mt-10'>
                <CustomButton title={"Male"} containerStyles={"w-full"} textStyles={"text-2xl"} handlePress={()=> nextPage(1)}/>
                <CustomButton title={"Female"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> nextPage(0)}/>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Gender