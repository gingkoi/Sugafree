import { View, Text, FlatList } from 'react-native'
import {useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchPosts, searchRecipes } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import SearchInput from '@/components/SearchInput'
import RecipeCard from '@/components/RecipeCard'
import EmptyState from '@/components/EmptyState'

const SearchRecipe = () => {

    const {query} = useLocalSearchParams();
    const { data : articles, refetch} = useAppwrite(()=> searchRecipes(query))

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
            <RecipeCard article={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className='mb-5 space-y-4 '>
              <View className='justify-between items-start flex-row mb-3'>
                <View>
                  <Text className='font-base text-[20px]'>Search results</Text>
                  <Text className='text-[32px] text-black font-bold'>{query}</Text>
                </View>
              </View>
              <SearchInput initialQuery={query} refetch={refetch}/>
    
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

export default SearchRecipe