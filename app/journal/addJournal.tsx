import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createJournal, fetchJournals } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { router } from 'expo-router';

const AddJournalPage = () => {
    const {user} = useGlobalContext()
    const [journals, setJournals] = useState([]);
    const [entry, setEntry] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mood, setmood] = useState("")
    const [glucoseLevel, setGlucoseLevel] = useState("")

  useEffect(() => {
    async function loadJournals() {
      const journalList = await fetchJournals(user.$id);
      setJournals(journalList);
    }
    loadJournals();
  }, []);

  const handleCreateJournal = async () => {
    if (entry.trim()) {
      await createJournal(user.$id, entry, date.toISOString(), mood, glucoseLevel);
      setEntry('');
      setGlucoseLevel("");
      setmood("")
      const updatedJournals = await fetchJournals(user.$id);
      setJournals(updatedJournals);
      router.push("/journal/journal")
    }
  };


  const onDateChange = (event : any, selectedDate : any) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView className='bg-white h-full pt-12 px-4'>
        <View className='flex-row justify-between items-center w-full mb-5'>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                className=""
                onPress={()=>{
                    router.push("/journal/journal");
                }}
                >
                <Ionicons name="chevron-back" size={50} color="#41D2F2" />
            </TouchableOpacity>
        </View>
            <View>
            <Text className='text-xl font-bold'>Add Medical Journal</Text>
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
        <TextInput
            className='p-5 pb-48 border border-textSecondary/30 rounded-xl mb-3 text-xl focus:border-2 focus:border-primary'
            placeholder="Write your medical journal entry..."
            value={entry}
            onChangeText={setEntry}
        />        
        <View>
        <Text className='text-lg font-bold mb-1'>How is your mood?</Text>
        <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
            <TextInput
                className='p-5 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                placeholder="Enter your mood"
                value={mood}
                onChangeText={setmood}
            />
        </View>        
        <Text className='text-lg font-bold mb-1'>Glucose Level</Text>
        <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
            <TextInput
                className='p-5 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                placeholder="Enter glucose level (mg/dL)"
                value={glucoseLevel}
                onChangeText={setGlucoseLevel}
                keyboardType='numeric'
            />
            <View className='bg-primary p-5 rounded-2xl'>
                <Fontisto name="test-bottle" size={30} color="white"/>
            </View>
        </View>
        </View>
        {/* <CustomButton title={"Pick a Date"} onPress={() => setShowPicker(true)}/> */}
        <Pressable className='p-5 bg-primary rounded-xl' onPress={() => setShowPicker(true)}>
            <Text className='text-white text-[18px] font-bold text-center'>Choose a Date</Text>
        </Pressable>
        {/* <Button title="Pick a Date" onPress={() => setShowPicker(true)}/> */}
        {showPicker && (
        <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
        />
        )}
        <Pressable className='p-5 bg-orange-500 rounded-xl my-2' onPress={handleCreateJournal}>
            <Text className='text-white text-[18px] font-bold text-center'>Add Journal</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default AddJournalPage;
