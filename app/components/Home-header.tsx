import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const HomeHeader = () => {
  const name = "John";
  return (
    <View className="flex-row justify-between items-center m-5 ">
      <TouchableOpacity>
        <View
          className="rounded-lg p-3"
          style={{ backgroundColor: "#c2e0c1" }}
        >
          <FontAwesome5 name="user" size={20} color="#04cc00" />
        </View>
      </TouchableOpacity>
      <Text className="text-xl font-bold text-[#222222]">Home</Text>

     

      <TouchableOpacity>
        <Feather name="bell" size={24} color="#222222" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
