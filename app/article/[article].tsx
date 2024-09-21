import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useGlobalSearchParams,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSinglePost } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleEnd from '@/components/ArticleEnd'

const backPath = require("@/assets/images/back.png")
const unSavePath = require("@/assets/images/unsave.png")

const Article = () => {

    const {currentId} = useLocalSearchParams();
    // console.log("From [Article]",currentId)


    const { data : article} = useAppwrite(()=> getSinglePost(currentId))

    // 66e85a0300060dd4a1b6

    const isoDate = article.$createdAt
    const date = new Date(isoDate);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Format as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;


    // console.log(article)

    return (
        <SafeAreaView className='bg-primary h-full'>
          <ScrollView>
            <View className='pt-3'>
              <View className='bg-primary pb-3'>
                <View className='w-full px-4'>
                  <View className='flex-row justify-between border border-red-500'>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className=""
                      onPress={()=>{
                        router.push("/(tabs)/home");
                    }}
                    >
                      <Image className='h-8 w-8' source={backPath}/>
                    </TouchableOpacity>
                    <Image className='h-8 w-8' source={unSavePath}/>
                  </View>
                  {/* Title, Author & Data section */}
                  <View className='mt-3'>
                    <Text className='text-[32px] text-white font-black'>{article.title}</Text>
                    <View className='flex-row justify-between items-center mt-2'>
                      <View className='flex-row items-center space-x-2'>
                        <View className="w-[46px] h-[46px] rounded-full border border-red-500 flex justify-center items-center p-0.5">
                          <Image
                            source={{ uri: article.avatar }}
                            className="w-full h-full rounded-full"
                            resizeMode="cover"
                          />
                        </View>
                        <Text className='text-white font-bold text-md'>{article.author}</Text>
                      </View>
                      <Text className='text-white font-bold text-md'>{formattedDate}</Text>
                    </View>
                  </View>
                  {/* Article Thumbnail */}
                  <View>
                  <Image
                    source={{ uri: article.thumbnail }}
                    className="w-full h-56 rounded-xl mt-3"
                    resizeMode="cover"
                    />
                  </View>
                  </View>
                  </View>
                  {/* Article Post */}
                  <View className='px-4 pt-2 bg-white'>
                    <Text className='text-justify text-lg'>
                      {article.post}
                    </Text>
                  </View>
              </View>
          </ScrollView>
        </SafeAreaView>
      )
}

export default Article