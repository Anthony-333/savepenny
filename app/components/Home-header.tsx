import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const HomeHeader = () => {
  return (
    <View className="flex-row justify-between items-center m-5 ">
      <TouchableOpacity>
        <View className="bg-violet-400 pt-2 px-1 rounded-lg">
          <Image
            source={require("../../assets/images/boy.svg")}
            style={{ width: 35, height: 35 }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      </TouchableOpacity>
      <Text className="text-xl font-bold">Home</Text>

      <TouchableOpacity>
        <Feather name="bell" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
