import {FlatList, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getUserRecipes } from '@/lib/appwrite'
import useAppwrite from "@/lib/useAppwrite"
import ArticleCard from '@/components/ArticleCard'
import RecipeCard from '@/components/RecipeCard'
import SearchRecipes from '@/components/SearchRecipes'


const Recipe = () => {
  const { data : recentRecipes} = useAppwrite(()=>getUserRecipes("66ec546c0007343c71f0"))


  return (
    <SafeAreaView className='bg-white h-full px-4 flex flex-col'>
      <FlatList
      data={recentRecipes}
      keyExtractor={(item : any)=> item.$id}
      renderItem={({item})=>(
        <RecipeCard article={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className='space-y-4'>
          <SearchRecipes/>

          <View className='w-full flex-1 mb-3'>
            <Text className='font-bold text-[36px]'>Recent Recipes</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState 
        title="No article found"
        subtitle="Find information from AI chatbot"/>
      )}
      />
    </SafeAreaView>
  )
}

export default Recipe
