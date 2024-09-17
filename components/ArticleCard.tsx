import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ArticleCard = ({article : {title, thumbnail,post, avatar, author}}:any) => {
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
          <Text
            className="text-sm text-textSecondary font-inter"
            numberOfLines={1}
          >
            {author}
          </Text>
        </View>
      </View>
      </View>
      <TouchableOpacity
          activeOpacity={0.7}
        //   onPress={() => setPlay(true)}
          className="w-full h-56 rounded-xl mt-3 relative flex justify-center items-center"
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