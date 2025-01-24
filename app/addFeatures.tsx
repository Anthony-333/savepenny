import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Uiview from "@/util/Uiview";

type CategoryTile = {
  name: string;
  icon: JSX.Element;
  route: "/addAccount";
};

type Category = {
  title: string;
  items: CategoryTile[];
};

export default function AddFeatures() {
  const router = useRouter();

  const categories: Category[] = [
    {
      title: "Money Management",
      items: [
        {
          name: "Transaction",
          route: "/addAccount",
          icon: <MaterialCommunityIcons name="cash-multiple" size={24} color="#4B5563" />,
        },
        {
          name: "Goals",
          route: "/addAccount",
          icon: <MaterialCommunityIcons name="flag-variant" size={24} color="#4B5563" />,
        },
        {
          name: "Budget",
          route: "/addAccount",
          icon: <MaterialCommunityIcons name="chart-pie" size={24} color="#4B5563" />,
        },
      ],
    },
    {
      title: "Planning & Analysis",
      items: [
        {
          name: "Reports",
          route: "/addAccount",
          icon: <MaterialCommunityIcons name="chart-bar" size={24} color="#4B5563" />,
        },
        {
          name: "Categories",
          route: "/addAccount",
          icon: <MaterialCommunityIcons name="tag-multiple" size={24} color="#4B5563" />,
        },
      ],
    },
  ];

  return (
    <Uiview className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Pressable
          onPress={() => router.back()}
          className="p-2 -ml-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text className="text-lg font-semibold ml-2">Add Features</Text>
      </View>

      {/* Content area */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index} className="p-4">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              {category.title}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {category.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  onPress={() => router.push(item.route)}
                  className="w-[calc(33.33%-8px)] bg-gray-50 rounded-xl p-4 items-center"
                >
                  {item.icon}
                  <Text className="text-sm text-gray-600 mt-2 text-center">
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </Uiview>
  );
} 