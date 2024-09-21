import { View, Text } from 'react-native'
import React from 'react'
import Siblings from '../(diabetesChecker)/siblings'
import { Redirect } from 'expo-router'

const Checker = () => {
  return (
    <Redirect href={"/(diabetesChecker)/siblings"}/>
  )
}

export default Checker