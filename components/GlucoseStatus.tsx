import { View, Text } from 'react-native'
import React from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import useAppwrite from '@/lib/useAppwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { fetchLatestJournal } from '@/lib/appwrite';

function formatDate(isoDateStr:any) {

  if(!isoDateStr){
    return
  }else{
    const date = new Date(isoDateStr);
  
    // Extracting date parts
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns 0-indexed month, so we add 1
    const year = date.getFullYear();
  
    // Extracting time parts
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    
    // Convert to 12-hour format
    hours = hours % 12 || 12; // Handle 12 PM and 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure minutes are always 2 digits
    
    // Format the AM/PM part
    const ampm = isPM ? 'pm' : 'am';
  
    // Return formatted string
    return `${day}/${month}/${year} ${hours}.${formattedMinutes}${ampm}`;
    }
  }


const GlucoseStatus = () => {

    const { user } = useGlobalContext()
    const { data : latestJournal } = useAppwrite(()=> fetchLatestJournal(user.$id))

    const dateDetails = formatDate(latestJournal?.$createdAt)

  return (
    <View className='rounded-xl py-5 px-4 space-y-3 bg-primary mx-2 h-[150px]'>
        <View className='flex-row items-start justify-between'>
            <View className='flex-col'>
                <Text className='text-3xl font-medium text-white mb-2'>Glucose Status</Text>
                <Text className='text-white font-medium'>Last update: {dateDetails ? dateDetails : "Undefined"}</Text>         
                <Text className='text-white font-medium'>Meal Type: {latestJournal?.mealType}</Text>
            </View>
            <View>
                <Fontisto name="laboratory" size={35} color="white" />
            </View>
        </View>
        <View className='flex-row items-end justify-between'>
        <Text className='text-white text-4xl font-bold'>{latestJournal?.glucose_level ? latestJournal.glucose_level : "Undefined"} mg/dL</Text>
        
        </View>
  </View>
  )
}

export default GlucoseStatus