import { View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from "react";

import React from 'react'
import { Slot, Stack, SplashScreen } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalProvider from '@/context/GlobalProvider';

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Merriweather-Black": require("../assets/fonts/Merriweather-Black.ttf"),
    "Inter": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf")
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='(auth)' options={{headerShown:false}}/>
        {/* <Stack.Screen name="(diabetesChecker)" options={{headerShown: false}}/> */}
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
        <Stack.Screen name="search/[query]" options={{headerShown:false}}/>
        <Stack.Screen name="article/[article]" options={{headerShown:false}}/>       
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout