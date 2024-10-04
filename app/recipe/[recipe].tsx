import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { savedRecipePost, checkIfSavedRecipe, getSingleRecipe, removeSavedRecipe } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'


const Recipe = () => {

    const {currentId} = useLocalSearchParams();
    const {user} = useGlobalContext()
    const { data : recipe} = useAppwrite(()=> getSingleRecipe(currentId))

    const [bookmark, setBookmark] = useState("bookmark-outline")
    const [isBookmarked, setIsBookmarked] = useState(false); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
      // Check bookmark status when component mounts
      const checkBookmarkStatus = async () => {
          try {
              const bookmarked = await checkIfSavedRecipe(user.$id, currentId);
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
            // Call the removeSavedRecipe function if the post is already bookmarked
            await removeSavedRecipe(user.$id, currentId);
            setIsBookmarked(false);  // Update state to unbookmarked
        } else {
            // Call the savedRecipePost function if the post is not bookmarked
            await savedRecipePost(user.$id, currentId);
            setIsBookmarked(true);   // Update state to bookmarked
        }
    } catch (error) {
        console.error('Error toggling bookmark:', error);
    } finally {
        setLoading(false);  // Turn off loading state after operation completes
    }
  };


    const isoDate = recipe.$createdAt
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
                    <Text className='text-[32px] text-white font-black'>{recipe.title}</Text>
                    <View className='flex-row justify-between items-center mt-2'>
                      <View className='flex-row items-center space-x-2'>

                        <Text className='text-white font-bold text-md'>{recipe.author}</Text>
                      </View>
                      <Text className='text-white font-bold text-md'>{formattedDate}</Text>
                    </View>
                  </View>
                  {/* recipe Thumbnail */}
                  <View>
                  <Image
                    source={{ uri: recipe.thumbnail }}
                    className="w-full h-56 rounded-xl mt-3"
                    resizeMode="cover"
                    />
                  </View>
                  </View>
                  </View>
                  {/* Article Post */}
                  <View className='px-4 pt-2 bg-white'>
                    {/* Nutrition details */}
                    <View className='flex-col py-2 mb-3 rounded-lg space-y-2 bg-primary'>
                        <View className='flex-row justify-evenly'>
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.carbohydrates}g</Text>
                                <Text className='font-bold text-base'>Crabs</Text>
                            </View>                          
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.proteins}g</Text>
                                <Text className='font-bold text-base'>Proteins</Text>
                            </View>                         
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.fats}g</Text>
                                <Text className='font-bold text-base'>Fats</Text>
                            </View>                       
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.fiber}g</Text>
                                <Text className='font-bold text-base'>Fiber</Text>
                            </View>                                             
                        </View>                        
                        <View className='rounded-lg flex-row justify-evenly'>
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.sugar}g</Text>
                                <Text className='font-bold text-base'>Sugar</Text>
                            </View>                          
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.sodium}mg</Text>
                                <Text className='font-bold text-base'>Sodium</Text>
                            </View>                         
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.cholesterol}mg</Text>
                                <Text className='font-bold text-base'>Cholesterol</Text>
                            </View>                       
                            <View className='bg-white flex-col items-center space-y-1 p-2 rounded-lg'>
                                <Text>{recipe.calories}kcal</Text>
                                <Text className='font-bold text-base'>Calories</Text>
                            </View>                                             
                        </View>
                    </View>
                    <View className='border border-primary rounded-lg mb-3 p-3 flex-row justify-evenly'>
                        <View className='flex-row items-center space-x-1'>
                            <Ionicons name="git-network" size={24} color="#808080" />
                            <Text>Glycemic Index: {recipe.glycemicIndex}</Text>
                        </View>                        
                        <View className='flex-row items-center space-x-1'>
                            <Ionicons name="disc-outline" size={24} color="#808080" />
                            <Text>Glycemic Load: {recipe.glycemicLoad}</Text>
                        </View>
                    </View>
                    <Text className='text-justify text-lg'>
                      {recipe.post}
                    </Text>
                  </View>
              </View>
          </ScrollView>
        </SafeAreaView>
      )
}

export default Recipe