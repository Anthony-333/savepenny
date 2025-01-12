import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const HomeHeader = () => {
  const name = "John";
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-row justify-between items-center bg-white px-5 pb-2 mb-5" style={{paddingTop: insets.top}}>
      <TouchableOpacity>
        <View
          className="rounded-full p-3"
          style={{ backgroundColor: "#c2e0c1" }}
        >
          <FontAwesome5 name="user" size={15} color="#04cc00" />
        </View>
      </TouchableOpacity>
      <Text className="text-xl font-bold text-[#222222]" style={{ fontFamily: 'figtree-regular' }}>Home</Text>

      <TouchableOpacity>
        <Feather name="bell" size={24} color="#222222" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
