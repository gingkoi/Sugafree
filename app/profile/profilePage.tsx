import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/GlobalProvider'
import Ionicons from '@expo/vector-icons/Ionicons';


const Profile = () => {

  const {
    profileAge,
    profileGender,
    profileHeight,
    profileWeight,
    profileRace,
    setProfileGender,
    setProfileAge,
    setProfileHeight,
    setProfileWeight,
    setProfileRace
  } = useGlobalContext()


    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
          <View className='flex-row justify-between items-center w-full py-5'>
            <View>
              <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                        onPress={()=>{
                          router.push("/(tabs)/home");
                      }}
                      >
                        <Ionicons name="chevron-back" size={50} color="#41D2F2" />
              </TouchableOpacity>
            </View>
              <View>
              <Text className='text-xl font-bold'>Edit Profile</Text>
              </View>
              <View>
              <TouchableOpacity
              >
                <Ionicons name="exit-outline" size={50} color="white" />
              </TouchableOpacity>
              </View>
            </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Gender</Text>
        <TextInput 
          className='p-4 border border-textSecondary/50 rounded-xl focus:border focus:border-primary'
          placeholder="Gender" 
          value={profileGender} 
          onChangeText={setProfileGender} 
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Age</Text>
        <TextInput 
          className='p-4 border border-textSecondary/50 rounded-xl focus:border focus:border-primary'
          placeholder="Age" 
          value={profileAge} 
          onChangeText={setProfileAge} 
          keyboardType="numeric" 
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Height</Text>
        <TextInput 
          className='p-4 border border-textSecondary/50 rounded-xl focus:border focus:border-primary'
          placeholder="Height (cm)" 
          value={profileHeight} 
          onChangeText={setProfileHeight} 
          keyboardType="numeric" 
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Weight</Text>
        <TextInput 
          className='p-4 border border-textSecondary/50 rounded-xl focus:border focus:border-primary'
          placeholder="Weight (kg)" 
          value={profileWeight} 
          onChangeText={setProfileWeight} 
          keyboardType="numeric" 
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Race</Text>
        <TextInput 
          className='p-4 border border-textSecondary/50 rounded-xl focus:border focus:border-primary' 
          placeholder="Race" 
          value={profileRace} 
          onChangeText={setProfileRace} 
        />
      </View>
      <TouchableOpacity className='bg-primary p-5 my-2 rounded-xl' onPress={()=> router.push("/(tabs)/profile")} activeOpacity={0.7}>
        <Text className='text-white font-bold text-xl text-center'>Update Profile</Text>
      </TouchableOpacity>
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

export default Profile