import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const CenterButton = () => {
  return (
    <TouchableOpacity>
      <View
        className="bg-indigo-600 p-3 rounded-full shadow-2xl"
        style={style.centerDiv}
      >
        <AntDesign name="plus" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CenterButton;

const style = StyleSheet.create({
  centerDiv: {
    top: -20
  },
});
