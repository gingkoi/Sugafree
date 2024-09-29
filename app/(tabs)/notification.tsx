import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/GlobalProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import NotificationCard from '@/components/NotificationCard';

const Notification = () => {
    const {user} = useGlobalContext()

    return (
        <SafeAreaView className='h-full bg-white px-4 pt-8 flex flex-col'>
            <Text className="font-bold text-[36px]">Notification</Text>
            <NotificationCard title={`Welcome to SugaFree ${user?.username}!`} message={"We're here to help you manage your diabetes with ease. Stay on top of your health, track your progress, and achieve your goals. Let's take this journey together!"}/>
            <NotificationCard title={`Ready to Take Control?`}message={"SugaFree is here to simplify your diabetes management journey. Track your health, get insights, and take charge. Let’s begin!"} />
        </SafeAreaView>
    )
}

export default Notification