import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs, Redirect } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor:"#FFFFFF",
        tabBarInactiveTintColor:"#FFFFFF",
        tabBarStyle:{
          backgroundColor:"#41D2F2",
          paddingTop:10,
          paddingBottom:10,
          height:70
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
        <Tabs.Screen name='read' options={{
          title:"Read",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          )
        }
        }/>       
        <Tabs.Screen name='notification' options={{
          title:"Notification",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          )
        }
        }/>        
        <Tabs.Screen name='profile' options={{
          title:"Profile",
          headerShown:false,
          tabBarIcon:({
            color,focused
          }) =>(
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          )
        }
        }/>       
      </Tabs>
    </>
  )
}

export default TabsLayout
