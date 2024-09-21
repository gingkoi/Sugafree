import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const eye = require("../assets/images/eye.png")
const eyeHide = require("../assets/images/eye_hide.png")

const FormField = ({title,value,placeholder,handleChangeText,otherStyles, ...props}:any) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-xl font-bold font-inter'>{title}</Text>
      <View className='w-full h-16 px-4 bg-[#F8F8F8] drop-shadow-2xl rounded-xl focus:border focus:border-primary flex-row'>
        <TextInput 
        className='flex-1 text-black'
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#888888"}
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
        <TouchableOpacity className='justify-center opacity-30' onPress={()=>{
            setShowPassword(!showPassword)
        }}>
            <Image className='h-6 w-6' source={!showPassword ? eye : eyeHide}
            resizeMode='contain'/>
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField