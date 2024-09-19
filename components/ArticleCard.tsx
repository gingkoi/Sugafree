import { View, Text, TouchableOpacity, Image, Alert} from 'react-native'
import { usePathname, router } from 'expo-router'
import React from 'react'

const ArticleCard = ({article : {title, thumbnail,post, avatar, author, $createdAt}}:any) => {

  const pathname = usePathname()
  const isoDate = $createdAt
  const date = new Date(isoDate);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  // Format as DD/MM/YYYY
  const formattedDate = `${day}/${month}/${year}`;
  

  return (
    <View className="flex flex-col items-center mb-5">
    <View className="flex flex-row gap-3 items-start">
      <View className="flex justify-center items-center flex-row flex-1">
        <View className="w-[46px] h-[46px] rounded-full border border-red-500 flex justify-center items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex justify-center flex-1 ml-3 gap-y-1">
          <Text
            className="font-semibold text-xl text-black"
            numberOfLines={1}
          >
            {title}
          </Text>
          <View className='border border-red-500'>
              <Text
                className="text-sm text-textSecondary font-inter"
                // numberOfLines={1}
              >
                {author}
              </Text>   
              <Text
                className="text-sm text-textSecondary font-inter"
                // numberOfLines={1}
              >
                {formattedDate}
              </Text>   
          </View>
        </View>
      </View>
      </View>
      <TouchableOpacity
          activeOpacity={0.7}
        //   onPress={() => setPlay(true)}
          className="w-full h-56 rounded-xl mt-3 relative flex justify-center items-center"
          onPress={()=>{
            if(!title){
              return Alert.alert('Missing query', "Please input something to search results across database")
            }
  
            if(pathname.startsWith("/article")) router.setParams({title})
            else router.push(`/article/${title}`);
          }}
        >
        <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
            />
        </TouchableOpacity>
      </View>
  )
}

export default ArticleCard