import { Alert, FlatList, RefreshControl, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import Recent from '@/components/Recent'
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

  // console.log(articles)

  return (
    <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
      <FlatList
      data={recentArticles}
      // data={[]}
      keyExtractor={(item : any)=> item.$id}
      renderItem={({item})=>(
        <ArticleCard article={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className='my-5 space-y-4 '>
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
          <SearchInput/>

          <View className='w-full flex-1'>
            <Text className='font-bold text-[36px]'>Recent Articles</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState 
        title="No article found"
        subtitle="Find information from AI chatbot"/>
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home
