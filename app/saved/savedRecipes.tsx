import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getMultipleRecipesByIds, getUserSavedRecipes } from '@/lib/appwrite'
import ArticleCard from '@/components/ArticleCard'
import RecipeCard from '@/components/RecipeCard'
import EmptyState from '@/components/EmptyState'
import { useGlobalContext } from '@/context/GlobalProvider'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react'


const SaveRecipe = () => {


  const {user,setUser, setIsLoggedIn} = useGlobalContext()

    const [bookmarks, setBookmarks] = useState([]);  // For storing bookmark IDs
    const [articles, setArticles] = useState([]);    // For storing the fetched articles
    const [loading, setLoading] = useState(true);    // To manage loading state

        // Fetch bookmarks first and then fetch articles based on bookmark IDs
        useEffect(() => {
          const fetchBookmarksAndArticles = async () => {
              try {
                  setLoading(true);
  
                  // Fetch user's bookmark IDs
                  const fetchedBookmarks = await getUserSavedRecipes(user.$id);
                  setBookmarks(fetchedBookmarks);
  
                  if (fetchedBookmarks.length > 0) {
                      // Once bookmarks are fetched, fetch the articles
                      const fetchedArticles = await getMultipleRecipesByIds(fetchedBookmarks);
                      setArticles(fetchedArticles);
                  }
              } catch (error) {
                  console.error("Error fetching bookmarks or articles:", error);
              } finally {
                  setLoading(false);  // Stop loading once everything is done
              }
          };
  
          fetchBookmarksAndArticles();
      }, [user.$id]);

    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
          <FlatList
          data={articles}
          // data={[]}
          keyExtractor={(item : any )=> item?.$id}
          renderItem={({item})=>(
            <RecipeCard article={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <View className='flex-row justify-between items-center w-full'>
            <View>
              <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                        onPress={()=>{
                          router.push("/profile/profilePage");
                      }}
                      >
                        <Ionicons name="chevron-back" size={50} color="#41D2F2" />
              </TouchableOpacity>
            </View>
              <View>
              <Text className='text-xl font-bold'>Saved Articles</Text>
              </View>
              <View>
              <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                      >
                        <Ionicons name="filter" size={45} color="#41D2F2" />
              </TouchableOpacity>
            </View>
            </View>
            <View>
              
            </View>


            <View className="mt-3 flex-col space-y-2">
              {/* <View className='flex-row items-center space-x-1'>
              <Ionicons name="location-outline" size={24} color="#808080" />
              <Text className='text-lg font-bold text-textSecondary'>Singapore</Text>
              </View> */}
            </View>

            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
            title="No recipes saved"
            subtitle="Click on the save icon to save them"
            linkPath={'/chat/chatbotAI'}
            buttonTitle={"Go to SugaFree chatbot"}
            />
          )}
        //   refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
          />
        </SafeAreaView>
      )
}

export default SaveRecipe