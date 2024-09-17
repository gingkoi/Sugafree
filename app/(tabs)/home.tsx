import { Alert, FlatList, RefreshControl, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import Recent from '@/components/Recent'
import EmptyState from '@/components/EmptyState'
import { getAllPosts } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const { data : articles, refetch} = useAppwrite(getAllPosts)

  const onRefresh = async ()=>{
    setRefreshing(true)
    await refetch()
    // recall articles -> if new articles appeared
    setRefreshing(false)
  }

  console.log(articles)

  return (
    <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
      <FlatList
      data={articles}
      // data={[]}
      keyExtractor={(item : any)=> item.$id}
      renderItem={({item})=>(
        <ArticleCard article={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className='my-5 space-y-6 '>
          <View className='justify-between items-start flex-row mb-4'>
            <View>
              <Text className='font-medium text-[32px]'>Hello Gingkoi 👋 </Text>
              <Text className='font-medium text-[15px] text-[#B3B3B3]'>Staying healthy</Text>
            </View>
            <View className='bg-red-500 p-3 rounded-full'>
              <Text>GI</Text>
            </View>
          </View>
          <SearchInput placeholder={"Search for articles"} otherStyles={"text-3xl"}/>

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
