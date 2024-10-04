import React, { useState, useEffect } from 'react';
import { View, Text,  FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { createJournal, deleteJournal, fetchJournals } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import EmptyState from '@/components/EmptyState'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

function formatDate(isoDateStr:any) {
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

const JournalPage = () => {
    const {user} = useGlobalContext()
    const [journals, setJournals] = useState([]);
    const [entry, setEntry] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    async function loadJournals() {
      const journalList = await fetchJournals(user.$id);
      setJournals(journalList);
    }
    loadJournals();
  }, []);

  const handleCreateJournal = async () => {
    if (entry.trim()) {
      await createJournal(user.$id, entry, date.toISOString());
      setEntry('');
      const updatedJournals = await fetchJournals(user.$id);
      setJournals(updatedJournals);
    }
  };

  const handleDeleteJournal = async (documentId : any) => {
    await deleteJournal(documentId);
    const updatedJournals = await fetchJournals(user.$id);
    setJournals(updatedJournals);
  };


  return (
    <SafeAreaView className='bg-white h-full pt-12 px-4'>
        <View className='flex-row justify-between items-center w-full'>
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
              <Text className='text-xl font-bold'>Medical Journal</Text>
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
            <TouchableOpacity className='absolute z-20 bottom-4 right-4 bg-white rounded-full' activeOpacity={0.7} onPress={()=>{
                    router.push("/journal/addJournal");
                }}>
                <Ionicons name="add-circle" size={90} color="#f97316" />
            </TouchableOpacity>
    <View >

      <FlatList
        data={journals}
        keyExtractor={(item : any) => item.$id}
        renderItem={({ item }) => (
          <View className='px-5 pb-5 pt-4 bg-primary rounded-2xl relative my-2'>
            <Text className='font-bold text-white text-3xl'>{formatDate(item.$createdAt).replace(" ",`\n`)}</Text>
            <Text className='text-white text-base my-5 border border-white p-4 rounded-xl'>{item.entry}</Text>
            <View className='flex-col justify-between'>
                <View className='flex-row items-center space-x-1'>
                    <Ionicons name="heart" size={24} color="white" />
                    <Text className='text-white font-bold text-lg'>Meal Type: {item?.mealType ? item.mealType : "Undefined"}</Text>
                </View>
                <View className='flex-row items-center space-x-1 mt-2'>
                    <Ionicons name="flask-sharp" size={24} color="white" />
                    <Text className='text-white font-bold text-lg'>Glucose Level: {item.glucose_level} (mg/dL)</Text>
                </View>
            </View>
            <TouchableOpacity className='z-10 absolute top-3 right-3' onPress={() => handleDeleteJournal(item.$id)} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={40} color="white"/>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={()=>(
            <EmptyState 
            title="No medical journals found"
            subtitle="Start creating medical notes"
            linkPath={'/journal/addJournal'}
            buttonTitle={"Create medical notes"}
            />
          )}
      />
    </View>
    </SafeAreaView>
  );
};


export default JournalPage;
