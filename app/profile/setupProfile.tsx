import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable, StyleSheet, Image,KeyboardAvoidingView } from 'react-native';
import { createProfile, signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from '@expo/vector-icons/Entypo';

const setupPath = require("@/assets/images/setup.jpg")

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

const SetupProfile = () => {
    const {user,setUser,setIsLoggedIn} = useGlobalContext()

    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [race, setRace] = useState("")

    const logout = async()=>{
        await signOut()
        setUser(null)
        setIsLoggedIn(false)
        router.replace("/(auth)/sign-in")
    }


    const handleCreateProfile = async () => {
        await createProfile(user.$id, gender, age, height, weight, race);
        router.push("/(tabs)/home")
    };


  return (
    <SafeAreaView className='bg-white h-full pt-12 px-4'>
        <View className='flex-row justify-between items-center w-full mb-5'>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                className=""
                // onPress={logout}
                >
                <Ionicons name="chevron-back" size={50} color="white" />
            </TouchableOpacity>
        </View>
            <View>
            <Text className='text-xl font-bold'>Set Up Profile</Text>
            </View>
            <View>
            <TouchableOpacity
                    activeOpacity={0.7}
                    className=""
                    >
                    <Ionicons name="filter" size={45} color="white" />
            </TouchableOpacity>
            </View>
        </View>
        <View >   
        <View className='flex-col justify-center items-center'>
                {/* Image */}
                <View className=''>
                    <Image source={setupPath} resizeMode='contain' className='h-40 w-60'/>
                </View>
            </View>
        <View>
            <Text className='text-lg font-bold mb-1'>Gender</Text>
            <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
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
            <Text className='text-lg font-bold mb-1'>How old are you?</Text>
            <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
                <TextInput
                    className='p-3 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                    placeholder="Enter your age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType='numeric'
                />
            </View>              
            <Text className='text-lg font-bold mb-1'>What is your height?</Text>
            <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
                <TextInput
                    className='p-3 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                    placeholder="Enter your height (cm)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType='numeric'
                />
            </View>              
            <Text className='text-lg font-bold mb-1'>What is your weight?</Text>
            <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
                <TextInput
                    className='p-3 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                    placeholder="Enter your weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType='numeric'
                />
            </View>    
            <Text className='text-lg font-bold mb-1'>What race are you?</Text>
            <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
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
        </View>
        <Pressable className='p-5 bg-primary rounded-xl my-2' onPress={handleCreateProfile}>
            <Text className='text-white text-[18px] font-bold text-center'>Complete Profile</Text>
        </Pressable>
        </View>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default SetupProfile;