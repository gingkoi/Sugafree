import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const logoPath = require("../../assets/images/Logo.png")

const SignIn = () => {

  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmiting, setIsSubmitting] = useState(false)

  const submit = async ()=>{
    if(!form.email || !form.password){
      Alert.alert("Error", "Please fill in all the fields")
    }
    setIsSubmitting(true)

    try{
      await signIn(form.email, form.password)
      const result = await getCurrentUser()

      setUser(result)
      setIsLogged(true)

      // Set it to global state...
      Alert.alert("Success", "User signed in successfully")
      router.replace("/home")
    } catch(error:any){
      Alert.alert("Error", error.message)
    } finally{
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-background h-full items-center'>
      <ScrollView>
        <View className='w-[340px] gap-y-5'>
          <View className='justify-center items-center pt-[80px]'>
            <Image 
            source={logoPath}
            resizeMode='contain'
            className='w-[231px] h-[42px]'
            />
          </View>
          <View className='w-full'>
            <Text className='text-[30px] font-black text-center'>
              Sign in your account
            </Text>
          </View> 
          {/* Login Input*/}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e:string)=>setForm({...form,
              email: e})}
            otherStyles={"mt-7"}
            keyboardType="email-address"
            placeholder={"Enter email"}
          />          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e:string)=>setForm({...form,
              password: e})}
            otherStyles={"mt-7"}
            placeholder={"Enter password"}
          />

          <CustomButton
          title={"Sign In"}
          handlePress={submit}
          containerStyles={"mt-10"}
          isLoading={isSubmiting}/> 

          <View className='justify-center flex-row gap-2'>
            <Text className='text-textSecondary text-[20px] font-medium'>
            Don’t have an account?
            </Text>
            <Link className='text-primary font-bold text-[20px]' href={"/sign-up"}>Sign Up!</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn