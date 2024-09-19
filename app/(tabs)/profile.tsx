import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserPosts, searchPosts, signOut } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'
import EmptyState from '@/components/EmptyState'
import { useGlobalContext } from '@/context/GlobalProvider'
import InfoBox from '@/components/InfoBox'

const logoutPath = require("@/assets/images/logout.png")

const Profile = () => {

    const {user,setUser, setIsLoggedIn} = useGlobalContext()
    const { data : articles} = useAppwrite(()=> getUserPosts(user.$id))

    const logout = async()=>{
        await signOut()
        setUser(null)
        setIsLoggedIn(false)

        router.replace("/(auth)/sign-in")
    }


    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
          <FlatList
          data={articles}
          // data={[]}
          keyExtractor={(item : any )=> item.$id}
          renderItem={({item})=>(
            <ArticleCard article={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-6"
            >
              <Image
                source={logoutPath}
                resizeMode="contain"
                className="w-10 h-10"
              />
            </TouchableOpacity>

            <View className="w-20 h-20 border border-secondary rounded-full flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <InfoBox
            title={user.username}
            containerStyles={"mt-5"}
            titleStyles={"text-lg"}
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={articles.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>

            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
            title="No articles or recipes saved"
            subtitle="Click on the save icon to save them"/>
          )}
          />
        </SafeAreaView>
      )
}

export default Profile