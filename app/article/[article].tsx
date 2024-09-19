import { View, Text, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSinglePost } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'
import EmptyState from '@/components/EmptyState'

const Article = () => {

    const {query} = useLocalSearchParams();
    const { data : article} = useAppwrite(()=> getSinglePost("66e9aaef003a9185da43"))

    console.log(article)

    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
          <FlatList
          data={article}
          // data={[]}
          keyExtractor={(item : any)=> item}
          renderItem={({item})=>(
            // <ArticleCard article={item}/>
            <View>
                <Text>{item}</Text>
            </View>
          )}
          ListHeaderComponent={()=>(
            <View className='mb-5 space-y-4 '>
              <View className='justify-between items-start flex-row mb-3'>
                <View>
                  <Text className='font-base text-[20px]'>Article</Text>
                  <Text className='text-[32px] text-black font-bold'>Hello</Text>
                </View>
              </View>
    
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
            title="404"
            subtitle="Cannot find article"/>
          )}
          />
        </SafeAreaView>
      )
}

export default Article