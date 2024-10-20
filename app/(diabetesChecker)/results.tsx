import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import LowRisk from './lowRisk'
import MidRisk from './midRisk'
import HighRisk from './highRisk'

const Results = () => {

  const {sibling, age, gender, doctor, fit, bmi} = useGlobalContext()

  const totalScore = sibling + age + gender + doctor + fit + bmi

  console.log("Total score: ",totalScore)

  if(totalScore < 2){
    return (
      <LowRisk/>
    )
  } else if (totalScore >= 3 && totalScore <= 5){
    return(
      <MidRisk/>
    )
  } else{
    return(
      <HighRisk/>
    )
  }
}

export default Results