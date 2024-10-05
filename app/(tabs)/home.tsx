import {Text, View, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import HomeCard from '@/components/home/HomeCard'
import { fetchLatestJournal } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import GlucoseStatus from '@/components/GlucoseStatus'
import EmptyGlucoseStatus from '@/components/EmptyGlucoseStatus'


const precheckPath = require("@/assets/images/home/precheck.png")
const virtualAssistantPath = require("@/assets/images/home/virtualAssistant.png")
const savedAriclePath = require("@/assets/images/home/savedArticle.png")
const savedRecipePath = require("@/assets/images/home/savedRecipe.png")
const medicalHistoryPath = require("@/assets/images/home/medicalHistory.png")
const trackPath = require("@/assets/images/track.png")
const logoPath = require("@/assets/images/Logo.png")

const Home = () => {
  const {user} = useGlobalContext()
  const { data : latestJournal } = useAppwrite(()=> fetchLatestJournal(user.$id))

  return (
      <SafeAreaView className='bg-white h-full px-4 pt-5 flex flex-col'>
        <ScrollView className=''>
        <View className='items-center flex-row mb-3 space-x-3'>
        <Link href={"/(tabs)/profile"}>
            <View className="w-[50px] h-[50px] border border-secondary rounded-full flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            </Link>
            <View>
              <Text className='font-medium text-[32px]'>Hi, {user?.username} 👋 </Text>
              <Text className='font-medium text-[15px] text-[#B3B3B3]'>Have a nice day</Text>
            </View>
        </View>
        {!latestJournal ? <EmptyGlucoseStatus/> : <GlucoseStatus/>}
        {/* <GlucoseStatus/>  */}
        <View className='flex-col items-center justify-center w-full relative mb-1'>
              <Image source={logoPath} className='w-[200px] h-[80px]' resizeMode='contain'/>
              <Text className='absolute z-10 bottom-0 text-base font-light'>Features</Text>
        </View> 
        <View className='flex-row mt-3 space-x-5 h-[170px]'>
          <HomeCard title={"Virtual Assistant"} link={"/chat/chatbotAI"} imagePath={virtualAssistantPath}/>
          <HomeCard title={"Medical Journal"} link={"/journal/journal"} imagePath={medicalHistoryPath}/>    
        </View>        
        <View className='flex-row mt-3 space-x-3 h-[170px]'>
          <HomeCard title={"Saved Recipes"} link={"/saved/savedRecipes"} imagePath={savedRecipePath}/>
          <HomeCard title={"Saved Articles"} link={"/saved/savedArticles"} imagePath={savedAriclePath}/> 
        </View>        
        <View className='flex-row mt-3 mb-5 space-x-3 h-[170px]'>
          <HomeCard title={"Pre-diabetic Check"} link={"/(diabetesChecker)/siblings"} imagePath={precheckPath}/>
          <HomeCard title={"Track Glucose"} link={"/journal/glucoseTester"} imagePath={trackPath}/>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#000000', 
  
      shadowOffset: {width: 0, height: 20}, 
      
      shadowRadius: 2, 
      
      elevation: 8.5, 
    }
  })
  


export default Home
