import { View, Text, FlatList } from 'react-native'
import {useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import SearchInput from '@/components/SearchInput'
import ArticleCard from '@/components/ArticleCard'
import EmptyState from '@/components/EmptyState'

const Search = () => {

    const {query} = useLocalSearchParams();
    const { data : articles, refetch} = useAppwrite(searchPosts(query))

    useEffect(() => {
        refetch();
      }, [query]);

    
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
            <View className='mb-5 space-y-4 '>
              <View className='justify-between items-start flex-row mb-3'>
                <View>
                  <Text className='font-medium text-[32px]'>Search results</Text>
                  <Text className='font-medium text-[15px] text-[#B3B3B3]'>{query}</Text>
                </View>
              </View>
              <SearchInput initialQuery={query}/>
    
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
            title="No article found"
            subtitle="Find information from AI chatbot"/>
          )}
          />
        </SafeAreaView>
      )
}

export default Search