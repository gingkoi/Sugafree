import {FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getUserPosts } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'
import { useGlobalContext } from '@/context/GlobalProvider'


const Article = () => {
  const {user} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  // const { data : articles, refetch} = useAppwrite(getAllPosts)
  // 66ec546c0007343c71f0
  const { data : recentArticles, refetch} = useAppwrite(()=>getUserPosts("66ec546c0007343c71f0"))

  // const onRefresh = async ()=>{
  //   setRefreshing(true)
  //   await refetch()
  //   // recall articles -> if new articles appeared
  //   setRefreshing(false)
  // }


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
        <View className='space-y-4'>
          <SearchInput/>

          <View className='w-full flex-1 mb-3'>
            <Text className='font-bold text-[36px]'>Recent Articles</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState 
        title="No article found"
        subtitle="Find information from AI chatbot"/>
      )}
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Article
