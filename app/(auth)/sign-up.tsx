import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const logoPath = require("../../assets/images/Logo.png")

const SignUp = () => {

  const [form, setForm] = useState({
    username:"",
    email:"",
    password:""
  })

  const [isSubmiting, setIsSubmitting] = useState(false)
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async ()=>{
    if(!form.username || !form.email || !form.password){
      Alert.alert("Error", "Please fill in all the fields")
    }
    setIsSubmitting(true)

    try{
      const results = await createUser(form.email, form.password, form.username)

      setUser(results)
      setIsLogged(true)

      // Set it to global state...
      router.replace("/profile/setupProfile")
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
              Sign Up your account
            </Text>
          </View> 
          {/* Sign Up Input*/}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e:string)=>setForm({...form,
              username: e})}
            otherStyles={"mt-7"}
            placeholder={"Enter username"}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e:string)=>setForm({...form,
              email: e})}
            otherStyles={"mt-5"}
            keyboardType="email-address"
            placeholder={"Enter email"}
          />          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e:string)=>setForm({...form,
              password: e})}
            otherStyles={"mt-5"}
            placeholder={"Enter password"}
          />          

          <CustomButton
          title={"Sign Up"}
          handlePress={submit}
          containerStyles={"mt-10"}
          isLoading={isSubmiting}/> 

          <View className='justify-center flex-row gap-2'>
            <Text className='text-textSecondary text-[20px] font-medium'>
            Have an account?
            </Text>
            <Link className='text-primary font-bold text-[20px]' href={"/sign-in"}>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp