import {FlatList, RefreshControl, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'
import { Link } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

const Home = () => {
  const {user} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const { data : articles, refetch} = useAppwrite(getAllPosts)
  const { data : recentArticles} = useAppwrite(getLatestPosts)

  const onRefresh = async ()=>{
    setRefreshing(true)
    await refetch()
    // recall articles -> if new articles appeared
    setRefreshing(false)
  }


  return (
    <SafeAreaView className='bg-white h-full px-4 pt-5 flex flex-col'>
      <View className='justify-between items-start flex-row mb-3'>
          <View>
            <Text className='font-medium text-[32px]'>Hello {user?.username} 👋 </Text>
            <Text className='font-medium text-[15px] text-[#B3B3B3]'>Staying healthy</Text>
          </View>
          <Link href={"/profile/profilePage"}>
          <View className="w-[50px] h-[50px] border border-secondary rounded-full flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-full"
              resizeMode="cover"
            />
          </View>
          </Link>
      </View>
    </SafeAreaView>
  )
}

export default Home
