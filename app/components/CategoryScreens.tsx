import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import UiText from "@/util/UiText";
import useScreenStore from "@/app/store/useScreenStore";

type RouteType = {
  id: number;
  name: 'Home' | 'Analytics' | 'Wallet';
};

const categories: RouteType[] = [
  { id: 1, name: "Home" },
  { id: 2, name: "Analytics" },
  { id: 3, name: "Wallet" }
];

const CategoryScreens = () => {
  const { activeScreen, setActiveScreen } = useScreenStore();

  const handleCategoryPress = (screen: RouteType['name']) => {
    setActiveScreen(screen);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="flex-row gap-2 mt-2"
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => handleCategoryPress(category.name)}
          className={`px-4 py-2 font-bold rounded-full mr-2 ${
            activeScreen === category.name
              ? "bg-[#22c55e]"
              : ""
          }`}
          activeOpacity={0.7}
        >
          <UiText
            className={`${
              activeScreen === category.name
                ? "text-white font-semibold text-sm"
                : "text-gray-300 text-sm"
            }`}
          >
            {category.name}
          </UiText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryScreens;
