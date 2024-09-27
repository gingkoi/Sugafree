import { View, Text, Image , TouchableOpacity} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider'

const fitPath = require("@/assets/images/diabetesChecker/fit.jpg")

const Fit = () => {

  const {setFit} = useGlobalContext()

  const nextPage = (score:any)=>{
    setFit(score)
    router.push("/(diabetesChecker)/yourself")
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
                        router.push("/(diabetesChecker)/doctor");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={fitPath} resizeMode='contain' className='h-60 w-60'/>
                </View>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center'>
                    Are you physically active?
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    Being inactive can increase your risk for type 2 diabetes.
                    </Text>
                </View>
                {/* Buttons */}
                <View className='w-full mt-10'>
                <CustomButton title={"Yes"} containerStyles={"w-full"} textStyles={"text-2xl"} handlePress={()=> nextPage(0)}/>
                <CustomButton title={"No"} containerStyles={"w-full mt-5"} textStyles={"text-2xl"} handlePress={()=> nextPage(2)}/>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Fit