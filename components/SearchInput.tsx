import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const searchPath = require("../assets/images/search.png")

const SearchInput = ({title,value,placeholder,handleChangeText,otherStyles, ...props}:any) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
      <View className='w-full h-16 px-4 bg-[#C6F2FC] drop-shadow-2xl rounded-2xl focus:border-primary flex-row space-x-4'>
        <TextInput 
        className='flex-1 text-black'
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#888888"}
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        />

        <TouchableOpacity className='justify-center'>
          <Image className='opacity-30' source={searchPath}/>
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput