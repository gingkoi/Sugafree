import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
  <>
  <Stack>
    <Stack.Screen name='sign-in' options={{
      headerShown:false
    }}/>    
    <Stack.Screen name='sign-up' options={{
      headerShown:false
    }}/>
  </Stack>
  <StatusBar backgroundColor='#FFFFFF'/>

  </>
  )
}

export default AuthLayout