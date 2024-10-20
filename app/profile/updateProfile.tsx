import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/GlobalProvider'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from '@expo/vector-icons/Entypo';
import { getProfileId, updateProfileId } from '@/lib/appwrite';
import useAppwrite from "@/lib/useAppwrite"


const genderList = [
  {title: 'Male'},
  {title: 'Female'},
  {title: 'Prefer not to say'},
]

const raceList = [
  {title: 'Chinese'},
  {title: 'Malay'},
  {title: 'Indian'},
  {title: 'Others'},
]

const typeList = [
  {title: 'Type 1 Diabetes'},
  {title: 'Type 2 Diabetes'},
  {title: 'Gestational Diabetes'},
  {title: 'Prediabetes'},
  {title: 'Unsure'},
  {title: 'Prefer not to say'},
]

const updateProfile = () => {

  const {user} = useGlobalContext()
  const { data : profileId} = useAppwrite(()=>getProfileId(user.$id))

  console.log(profileId)

  const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [race, setRace] = useState("")
    const [type, setType] = useState("")

    const handleUpdateProfile = async () => {
      await updateProfileId(profileId, gender, age, height, weight, race, type);
      router.push("/(tabs)/profile")
    }; 



    return (
        <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
          <View className='flex-row justify-between items-center w-full py-5'>
            <View>
              <TouchableOpacity
                        activeOpacity={0.7}
                        className=""
                        onPress={()=>{
                          router.push("/(tabs)/profile");
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
        <SelectDropdown
                data={genderList}
                onSelect={(selectedItem, index) => {
                setGender(selectedItem.title)
                console.log(gender)
                }}
                renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Select your gender'}
                    </Text>
                    <Entypo name={isOpened ? "chevron-up" :"chevron-down"} size={24} color="black" />
                    </View>
                );
                }}
                renderItem={(item, index, isSelected) => {
                return (
                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    <Text className='text-lg'>{item.title}</Text>
                    </View>
                );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
                /> 
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Age</Text>
        <TextInput
                  className='p-3 border flex-grow border-textSecondary/30 rounded-xl focus:border-2 focus:border-primary'
                  placeholder="Enter your age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType='numeric'
                />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Height</Text>
        <TextInput 
          className='p-3 border flex-grow border-textSecondary/30 rounded-xl focus:border-2 focus:border-primary'
          placeholder="Enter your height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType='numeric'
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Weight</Text>
        <TextInput 
          className='p-3 border flex-grow border-textSecondary/30 rounded-xl focus:border-2 focus:border-primary'
          placeholder="Enter your weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType='numeric'
        />
      </View>
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Race</Text>
        <SelectDropdown
          data={raceList}
          onSelect={(selectedItem, index) => {
          setRace(selectedItem.title)
          console.log(race)
          }}
          renderButton={(selectedItem, isOpened) => {
          return (
              <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select your race'}
              </Text>
              <Entypo name={isOpened ? "chevron-up" :"chevron-down"} size={24} color="black" />
              </View>
          );
          }}
          renderItem={(item, index, isSelected) => {
          return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text className='text-lg'>{item.title}</Text>
              </View>
          );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          />  
      </View>      
      <View className='flex-col space-y-2 my-1'>
        <Text className='font-bold text-xl'>Type</Text>
        <SelectDropdown
          data={typeList}
          onSelect={(selectedItem, index) => {
          setType(selectedItem.title)
          console.log(type)
          }}
          renderButton={(selectedItem, isOpened) => {
          return (
              <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select your type'}
              </Text>
              <Entypo name={isOpened ? "chevron-up" :"chevron-down"} size={24} color="black" />
              </View>
          );
          }}
          renderItem={(item, index, isSelected) => {
          return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text className='text-lg'>{item.title}</Text>
              </View>
          );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          />  
      </View>
      <TouchableOpacity className='bg-primary p-5 my-2 rounded-xl' onPress={handleUpdateProfile} activeOpacity={0.7}>
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
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderStyle:"solid",
    borderWidth: 1,
    borderColor:"#8080804D",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    color: '#808080',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default updateProfile