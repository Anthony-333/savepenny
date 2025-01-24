import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type EmptyWidgetProps = {
  type: "account" | "features";
};

export default function EmptyWidget({ type }: EmptyWidgetProps) {
  const router = useRouter();

  const widgetConfig = {
    account: {
      route: "/addAccount" as const,
      text: "+ Add Account",
      icon: "bank-plus",
    },
    features: {
      route: "/addFeatures" as const,
      text: "+ Add Features",
      icon: "plus-box",
    },
  } as const;

  const config = widgetConfig[type];

  return (
    <Pressable
      onPress={() => router.push(config.route)}
      className="flex-1 items-center justify-center 
      border-2 border-dashed border-gray-300 
      rounded-2xl p-4 min-h-[120px] space-y-2 w-full
      my-2
      "
    >
      <Text className="text-gray-500 text-base font-medium">{config.text}</Text>
    </Pressable>
  );
}
