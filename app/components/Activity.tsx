import { View, Text, Image } from "react-native";
import React from "react";
import { ActivityType } from "../../assets/data/data";

type Props = {
  item: ActivityType;
};

const Activity = ({ item }: Props) => {
  return (
    <View className="flex-row my-3 w-full justify-between items-center">
      <View className="flex-row items-center gap-3">
        <View className="bg-[#27043a] rounded-xl">
          <Image
            source={item.image}
            className="m-[14] h-[35] w-[35] object-contain "
          />
        </View>
        <View>
          <Text className="text-xl font-semibold text-white">{item.name}</Text>
          <Text className="text-white">{item.date}</Text>
        </View>
      </View>

      <Text className="font-bold text-xl text-white" >{item.price}</Text>
    </View>
  );
};

export default React.memo(Activity);
