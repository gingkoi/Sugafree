import {Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllPosts, getLatestPosts, getProfile } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import { Link, Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import HomeCard from '@/components/home/HomeCard'

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
        <HomeCard title={"Pre-diabetic Check"} link={"/(diabetesChecker)/siblings"} imagePath={precheckPath}/>
        <HomeCard title={"Medical Journal"} link={"/journal/journal"} imagePath={medicalHistoryPath}/>
        <HomeCard title={"Virtual Assistant"} link={"/chat/chatbotAI"} imagePath={virtualAssistantPath}/>
        <HomeCard title={"Saved Articles"} link={"/saved/savedArticles"} imagePath={savedAriclePath}/>
        <HomeCard title={"Saved Recipes"} link={"/saved/savedRecipes"} imagePath={savedRecipePath}/>
      </SafeAreaView>
    )
  }


export default Home
