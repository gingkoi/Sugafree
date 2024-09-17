import { FlatList, RefreshControl, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import Recent from '@/components/Recent'
import EmptyState from '@/components/EmptyState'

const Home = () => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{

    }

    fetchData()
  },[])

  const onRefresh = async ()=>{
    setRefreshing(true)
    // recall articles -> if new articles appeared
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
      data={[{id:1},{id:2},{id:3}]}
      // data={[]}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Text className='text-3xl'>{item.id}</Text>
      )}
      ListHeaderComponent={()=>(
        <View className='my-6 px-4 space-y-6 border border-red-500'>
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
            <Text className='font-bold text-[30px]'>Recent Articles</Text>

            <Recent posts={[{id:1},{id:2},{id:3}] ?? []}/>
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
