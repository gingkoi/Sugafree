import { View, Text, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import Ionicons from '@expo/vector-icons/Ionicons';

import { getProfile } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"



const Profile = () => {

  const {user,
    setUser, 
    setIsLoggedIn,
  } = useGlobalContext()

  const { data : profile} = useAppwrite(()=>getProfile(user.$id))
  // console.log(profile)

    const logout = async()=>{
        await signOut()
        setUser(null)
        setIsLoggedIn(false)
        router.replace("/(auth)/sign-in")
    }

    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <View className='flex-row justify-between items-center w-full'>
            <View>
              <TouchableOpacity
                        activeOpacity={0.7}
                      >
                        <Ionicons name="chevron-back" size={50} color="white" />
              </TouchableOpacity>
            </View>
              <View>
              <Text className='text-xl font-bold'>Profile</Text>
              </View>
              <View>
              <TouchableOpacity
                onPress={logout}
              >
                <Ionicons name="exit-outline" size={50} color="#ff0000" />
              </TouchableOpacity>
              </View>
            </View>
            <View>
              
            </View>
            <View className="w-20 h-20 border border-secondary rounded-full flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            <View className='mt-5 space-y-1'>          
              <Text className='text-xl text-center font-bold'>{user?.username}</Text>
              <View className='flex-row items-center space-x-1'>
                <Ionicons name="mail-outline" size={15} color="#808080" />
                <Text className='text-sm font-light text-textSecondary'>{user?.email}</Text>
              </View>
            </View>
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=> router.push("/profile/updateProfile")}
            className='p-4 bg-primary rounded-xl my-3'
            >
              <Text className='text-white font-bold text-lg'>Edit Profile</Text>
            </TouchableOpacity>  

            {/* Details Section */}
            <View className=' w-full space-y-1'>
              <Text className='text-xl font-inter font-bold'>Details</Text>
              <View className='border border-textSecondary/50 p-3 rounded-lg space-y-2'>
                <View className='flex-row items-center space-x-2 border-b border-textSecondary/50 pb-2'>
                <Ionicons name="male" size={24} color="black" />
                <Text className='text-base'>Gender: {!profile?.gender ? "Undefined" : profile?.gender}</Text>
                </View>                
                <View className='flex-row items-center border-b border-textSecondary/50 space-x-2 pb-2'>
                <Ionicons name="body" size={24} color="black" />
                <Text className='text-base'>Age: {!profile?.age ? "Undefined" : profile?.age} years old</Text>
                </View>                
                <View className='flex-row items-center border-b border-textSecondary/50 space-x-2 pb-2'>
                <Ionicons name="man" size={24} color="black" />
                <Text className='text-base'>Height: {!profile?.height ? "Undefined" : profile?.height} cm</Text>
                </View>                
                <View className='flex-row items-center border-b border-textSecondary/50 space-x-2 pb-2'>
                <Ionicons name="scale-outline" size={24} color="black" />
                <Text className='text-base'>Weight: {!profile?.weight ? "Undefined" : profile?.weight} kg</Text>
                </View>                
                <View className='flex-row items-center space-x-2 border-b border-textSecondary/50 pb-2'>
                <Ionicons name="color-filter-outline" size={24} color="black" />
                <Text className='text-base'>Race: {!profile?.race ? "Undefined" : profile?.race}</Text>
                </View>                  
                <View className='flex-row items-center space-x-2'>
                <Ionicons name="medical-outline" size={24} color="black" />
                <Text className='text-base'>Type: {!profile?.type ? "Undefined" : profile?.type}</Text>
                </View>                
              </View>
            </View>
            </View>
        </SafeAreaView>
      )
}

export default Profile