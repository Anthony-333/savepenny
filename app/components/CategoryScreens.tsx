import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import UiText from "@/util/UiText";

type RouteType = "/" | "/analytics" | "/wallet" | "/settings";

const categories: Array<{
  id: number;
  name: string;
  route: RouteType;
}> = [
  { id: 1, name: "Home", route: "/" },
  { id: 2, name: "Analytics", route: "/analytics" },
  { id: 3, name: "Wallet", route: "/wallet" },
  { id: 4, name: "Settings", route: "/settings" },
];

const CategoryScreens = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Home");

  const handleCategoryPress = (category: string, route: RouteType) => {
    setActiveCategory(category);
    router.push(route);
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
          onPress={() => handleCategoryPress(category.name, category.route)}
          className={`px-4 py-2 font-bold rounded-full mr-2 ${
            activeCategory === category.name
              ? "bg-[#22c55e]"
              : ""
          }`}
          activeOpacity={0.7}
        >
          <UiText
            className={`${
              activeCategory === category.name
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
