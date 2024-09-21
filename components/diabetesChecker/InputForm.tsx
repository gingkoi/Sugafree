import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'


const InputForm = ({title,value,placeholder,handleChangeText,otherStyles, ...props}:any) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles} mt-3`}>
        <Text className='text-center font-bold'>{title}</Text>
      <View className='w-full h-16 px-4 bg-[#ededed] drop-shadow-2xl rounded-xl focus:border focus:border-primary flex-row'>
        <TextInput 
        className='flex-1 text-black text-center'
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#888888"}
        // onChangeText={handleChangeText}
        keyboardType='numeric'
        />
      </View>
    </View>
  )
}

export default InputForm