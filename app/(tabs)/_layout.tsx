import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Feather from '@expo/vector-icons/Feather';


import { View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel:true,
        tabBarActiveTintColor:"#FFFFFF",
        tabBarInactiveTintColor:"#FFFFFF",
        tabBarStyle:{
          backgroundColor:"#41D2F2",
          paddingTop:10,
          paddingBottom:10,
          height:76
        }
        
      }
      }>
        <Tabs.Screen name='home' options={{
          title:"Home",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={30}/>
          )
        }
        }/>        
        <Tabs.Screen name='recipes' options={{
          title:"Recipes",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'cafe' : 'cafe-outline'} color={color} />
          )
        }
        }/>        
        <Tabs.Screen name='checker' options={{
          title:"Checker",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'eye' : 'eye-outline'} color={color} />
          )
        }
        }/>        
        <Tabs.Screen name='chat' options={{
          title:"Chatbot",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} />
          )
        }
        }/>
      </Tabs>
    </>
  )
}

export default TabsLayout
