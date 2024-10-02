import {Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import HomeCard from '@/components/home/HomeCard'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const precheckPath = require("@/assets/images/home/precheck.png")
const virtualAssistantPath = require("@/assets/images/home/virtualAssistant.png")
const savedAriclePath = require("@/assets/images/home/savedArticle.png")
const savedRecipePath = require("@/assets/images/home/savedRecipe.png")
const medicalHistoryPath = require("@/assets/images/home/medicalHistory.png")

const Home = () => {
  const {user} = useGlobalContext()

  return (
      <SafeAreaView className='bg-white h-full px-4 pt-5 flex flex-col'>
        <View className='justify-between items-start flex-row mb-3'>
            <View>
              <Text className='font-medium text-[32px]'>Hello {user?.username} 👋 </Text>
              <Text className='font-medium text-[15px] text-[#B3B3B3]'>Staying healthy</Text>
            </View>
            <Link href={"/(tabs)/profile"}>
            <View className="w-[50px] h-[50px] border border-secondary rounded-full flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            </Link>
        </View>    
        <View className='rounded-lg py-3 px-4 space-y-3 bg-white mx-2' style={styles.shadow}>
          <Text className='text-base font-medium'>How are you feeling today?</Text>
          <View className='flex-row items-center justify-around'>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={42} color="#c3ee21" />
            <MaterialCommunityIcons name="emoticon-neutral-outline" size={42} color="#f3d84d" />
            <MaterialCommunityIcons name="emoticon-sad-outline" size={42} color="#f2a134" />
            <MaterialCommunityIcons name="emoticon-sick-outline" size={42} color="#e51f1f" />
          </View>
        </View>
        <View className='flex-row mt-3 space-x-5 h-[170px]'>
          <HomeCard title={"Virtual Assistant"} link={"/chat/chatbotAI"} imagePath={virtualAssistantPath}/>
          <HomeCard title={"Medical Journal"} link={"/journal/journal"} imagePath={medicalHistoryPath}/>    
        </View>        
        <View className='flex-row mt-3 space-x-3 h-[170px]'>
          <HomeCard title={"Saved Recipes"} link={"/saved/savedRecipes"} imagePath={savedRecipePath}/>
          <HomeCard title={"Saved Articles"} link={"/saved/savedArticles"} imagePath={savedAriclePath}/> 
        </View>        
        <View className='flex-row mt-3 space-x-3 h-[170px]'>
          <HomeCard title={"Pre-diabetic Check"} link={"/(diabetesChecker)/siblings"} imagePath={precheckPath}/>
        </View>
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
