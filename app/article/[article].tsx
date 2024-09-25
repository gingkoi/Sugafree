import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { bookmarkPost, checkIfBookmarked, getMultiplePostsByIds, getSinglePost, getUserBookmarks, removeBookmark } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'


const Article = () => {

    const {currentId} = useLocalSearchParams();
    const {user} = useGlobalContext()
    const { data : article} = useAppwrite(()=> getSinglePost(currentId))

    const [bookmark, setBookmark] = useState("bookmark-outline")
    const [isBookmarked, setIsBookmarked] = useState(false); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
      // Check bookmark status when component mounts
      const checkBookmarkStatus = async () => {
          try {
              const bookmarked = await checkIfBookmarked(user.$id, currentId);
              setIsBookmarked(bookmarked);
          } catch (error) {
              console.error("Error checking bookmark status:", error);
          }
      };
      checkBookmarkStatus();
  }, [currentId, user.$id]);

  

  const toggleBookmark = async () => {
    if (loading) return;  // Prevent multiple presses during loading

    setLoading(true);  // Set loading state while processing

    try {
        if (isBookmarked) {
            // Call the removeBookmark function if the post is already bookmarked
            await removeBookmark(user.$id, currentId);
            setIsBookmarked(false);  // Update state to unbookmarked
        } else {
            // Call the bookmarkPost function if the post is not bookmarked
            await bookmarkPost(user.$id, currentId);
            setIsBookmarked(true);   // Update state to bookmarked
        }
    } catch (error) {
        console.error('Error toggling bookmark:', error);
    } finally {
        setLoading(false);  // Turn off loading state after operation completes
    }
  };


    const isoDate = article.$createdAt
    const date = new Date(isoDate);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Format as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;


    return (
        <SafeAreaView className='bg-primary h-full'>
          <ScrollView>
            <View className='pt-3'>
              <View className='bg-primary pb-3'>
                <View className='w-full px-4'>
                  <View className='flex-row justify-between'>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                        onPress={()=>{
                          router.push("/(tabs)/read");
                      }}
                      >
                        <Ionicons name="chevron-back" size={50} color="white" />
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity onPress={toggleBookmark} disabled={loading}>
                    <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={50} color="white" />
                    </TouchableOpacity>
                    {/* {loading && <Text>Loading...</Text>} */}
                    </View>
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