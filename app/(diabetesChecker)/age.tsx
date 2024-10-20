import { View, Text, Image , TouchableOpacity} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider'

const agePath = require("@/assets/images/diabetesChecker/age.jpg")

const Age = () => {

  const {setAge} = useGlobalContext()

  const nextPage = (score:any)=>{
    setAge(score)
    router.push("/(diabetesChecker)/gender")
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
                        router.push("/(diabetesChecker)/siblings");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View>
                    <Image source={agePath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    How old are you?
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full mt-10'>
                <CustomButton title={"Younger than 40"} containerStyles={"w-full"} textStyles={"text-2xl"} handlePress={()=> nextPage(0)}/>
                <CustomButton title={"40-49 Years"} containerStyles={"w-full mt-3"} textStyles={"text-2xl"} handlePress={()=> nextPage(1)}/>
                <CustomButton title={"50-59 Years"} containerStyles={"w-full mt-3"} textStyles={"text-2xl"} handlePress={()=> nextPage(2)}/>
                <CustomButton title={"60+ Years"} containerStyles={"w-full mt-3"} textStyles={"text-2xl"} handlePress={()=> nextPage(3)}/>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Age