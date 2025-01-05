import { View, Text, Image } from "react-native";
import React from "react";
import { ActivityType } from "../../assets/data/data";
import UiText from "@/util/UiText";

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
          <UiText className="text-xl font-semibold">{item.name}</UiText>
         <UiText>{item.date}</UiText>
        </View>
      </View>

      <UiText className="font-bold text-xl" >{item.price}</UiText>
    </View>
  );
};

export default React.memo(Activity);
