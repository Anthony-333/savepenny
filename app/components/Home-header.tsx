import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UiText from "@/util/UiText";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const getInitials = (name: string): string => {
  // Trim and split the name
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(" ");

  // Handle different name formats
  if (nameParts.length === 0) return "";

  if (nameParts.length === 1) {
    // If only one word, take the first letter
    return nameParts[0].charAt(0).toUpperCase();
  }

  // For two or more words, take first letters of first and last words
  return (
    nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
  ).toUpperCase();
};

const HomeHeader = () => {
  const name = "John Anthony";
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row justify-between items-center bg-white px-5 pb-2"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center gap-2">

        <TouchableOpacity className="">
          <UiText style={styles.initialsStyle}>{getInitials(name)}</UiText>
        </TouchableOpacity>

        <View>
          <UiText className="font-bold text-gray-500">Welcome</UiText>
          <UiText className="font-bold">{name}</UiText>
        </View>
      </View>

      <TouchableOpacity>
        <Feather name="bell" size={24} color="#222222" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  initialsStyle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#04cc00",
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontWeight: "bold",
  },
});

export default HomeHeader;
