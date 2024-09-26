import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { usePathname, router } from 'expo-router'

const searchPath = require("../assets/images/search.png")

const SearchRecipes = ({initialQuery}:any) => {

  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || "")

  return (
      <View className='w-full h-16 px-4 bg-[#E2F8FD] drop-shadow-2xl rounded-2xl focus:border focus:border-primary flex-row space-x-4'>
        <TextInput 
        className='flex-1 text-black'
        value={query}
        placeholder={"Search for recipes"}
        placeholderTextColor={"#888888"}
        onChangeText={(e)=> setQuery(e)}
        />

        <TouchableOpacity 
        className='justify-center'
        onPress={()=>{
          if(!query){
            return Alert.alert('Missing query', "Please input something to search results across database")
          }

          if(pathname.startsWith("/searchRecipe")) router.setParams({query})
          else router.push(`/searchRecipe/${query}`);
        }}
        >
          <Image className='opacity-30' source={searchPath}/>
        </TouchableOpacity>
      </View>
  )
}

export default SearchRecipes