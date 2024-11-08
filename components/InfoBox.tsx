import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }:any) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-black text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-black text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;