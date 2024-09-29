import { View, Text, Image , ScrollView, TouchableOpacity} from 'react-native'
import {router} from "expo-router"
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '@/components/CustomButton'

const gbmPath = require("@/assets/images/gbm.jpg")

const GlucoseTester = () => {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1">
        <View className='bg-white h-full w-full flex-col mt-8'>
        <View className='pb-5 px-4'>
            <TouchableOpacity
                      activeOpacity={0.7}
                      className=""
                      onPress={()=>{
                        router.push("/journal/addJournal");
                    }}
                    >
                      <Ionicons name="chevron-back" size={50} color="#41D2F2" />
                    </TouchableOpacity>
            </View>
            <View className='mx-14 flex-col justify-center items-center'>
                {/* Image */}
                <TouchableOpacity>
                  <Image source={gbmPath} resizeMode='contain' className='h-80 w-80'/>
                </TouchableOpacity>
                {/* Question */}
                <View>
                    <Text className='font-merriBlack text-[36px] text-center mt-5'>
                    Click to start scanning
                    </Text>
                    <Text className='text-center mt-3 text-base'>
                    {`Enable Bluetooth on Your Phone\nEnsure that your phone’s Bluetooth is turned on.\n\nThis is necessary for the app to scan and connect to the glucose meter.`}
                    </Text>
                    
                </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default GlucoseTester