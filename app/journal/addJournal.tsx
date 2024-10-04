import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createJournal, fetchJournals } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { router } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from '@expo/vector-icons/Entypo';

const mealTypeList = [
  {title: 'Breakfast'},
  {title: 'Lunch'},
  {title: 'Dinner'},
  {title: 'Supper'},
  {title: 'Snack'},
]

const AddJournalPage = () => {
    const {user} = useGlobalContext()
    const [journals, setJournals] = useState([]);
    const [entry, setEntry] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mealType, setmealType] = useState("")
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
      await createJournal(user.$id, entry, date.toISOString(), mealType, glucoseLevel);
      setEntry('');
      setGlucoseLevel("");
      setmealType("")
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
        <Text className='text-lg font-bold mb-1'>How is your meal type?</Text>
        <SelectDropdown
                data={mealTypeList}
                onSelect={(selectedItem, index) => {
                setmealType(selectedItem.title)
                }}
                renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Select your meal type'}
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
        <Text className='text-lg font-bold mb-1 mt-3'>Glucose Level</Text>
        <View className='flex-row items-center justify-between  mb-3 space-x-1'>         
            <TextInput
                className='p-5 border flex-grow border-textSecondary/30 rounded-xl text-xl focus:border-2 focus:border-primary'
                placeholder="Enter glucose level (mg/dL)"
                value={glucoseLevel}
                onChangeText={setGlucoseLevel}
                keyboardType='numeric'
            />
            <TouchableOpacity activeOpacity={0.7} className='bg-primary p-5 rounded-2xl' onPress={()=> router.push("/journal/glucoseTester")}>
                <Fontisto name="test-bottle" size={30} color="white"/>
            </TouchableOpacity>
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

export default AddJournalPage;
