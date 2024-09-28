import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'


const BmiCalculator = () => {

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const {bmi, setBmi} = useGlobalContext()

  const handleTextChange = (value : any, type : any) => {

    if(type === "height"){
      setHeight(value);
    }
    if(type === "weight"){
      setWeight(value);
    }  
  };

  useEffect(() => {
    if (weight && height) {
      calculateBMI(Number(weight), Number(height))
    }
  }, [weight, height])

  function calculateBMI(weight: number, height: number) {
    // BMI formula: weight (kg) / height (m)^2
    height = height/100
    const bmi: number = weight / (height * height);
    
    // Round to two decimal places
    const results = Number(bmi.toFixed(2))

    if(results < 25){
      // Normal
      setBmi(0)
    } else if (results >= 25 && results < 29.9){
      // Overweight
      setBmi(1)
    } else {
      // Obese
      setBmi(3)
    }
  }

  calculateBMI(Number(weight), Number(height))

  return (
    <View>
      <View className={`space-y-2 mt-3`}>
          <Text className='text-center font-bold'>Height</Text>
        <View className='w-full h-16 px-4 bg-[#ededed] drop-shadow-2xl rounded-xl focus:border focus:border-primary flex-row'>
          <TextInput 
          className='flex-1 text-black text-center'
          value={height}
          placeholder={"Enter Height (cm)"}
          placeholderTextColor={"#888888"}
          onChangeText={text => handleTextChange(text, "height")}
          keyboardType='numeric'
          />
        </View>
      </View>
      <View className={`space-y-2 mt-3`}>
          <Text className='text-center font-bold'>Weight</Text>
        <View className='w-full h-16 px-4 bg-[#ededed] drop-shadow-2xl rounded-xl focus:border focus:border-primary flex-row'>
          <TextInput 
          className='flex-1 text-black text-center'
          value={weight}
          placeholder={"Enter Weight (kg)"}
          placeholderTextColor={"#888888"}
          onChangeText={text => handleTextChange(text, "weight")}
          keyboardType='numeric'
          />
        </View>
      </View>
    </View>
  )
}



export default BmiCalculator