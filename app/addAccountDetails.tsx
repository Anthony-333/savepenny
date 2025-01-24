import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Uiview from "@/util/Uiview";
import { useState } from "react";
import { Image } from "expo-image";
import UiText from "@/util/UiText";

export default function AddAccountDetails() {
  const router = useRouter();
  const { type, category } = useLocalSearchParams<{
    type: string;
    category: string;
  }>();

  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    notes: "",
  });

  const handleSubmit = () => {
    // TODO: Implement account creation logic
    console.log("Form submitted:", { ...formData, type, category });
    router.back();
  };

  return (
    <Uiview className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center flex-1">
          <Pressable
            onPress={() => router.back()}
            className="p-2 -ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text className="text-lg font-semibold ml-2 flex-1" numberOfLines={1}>
            Add {type}
          </Text>
        </View>
        <Pressable
          onPress={handleSubmit}
          className="bg-blue-500 px-5 py-2.5 rounded-lg ml-4"
        >
          <Text className="text-white font-medium">Save</Text>
        </Pressable>
      </View>

      {/* Form content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-4 space-y-6"
      >
        <View className="flex-col justify-between items-center bg-red-500 w-full h-56 rounded-2xl p-5">
          <View className="flex-row items-center justify-between w-full">
            <FontAwesome name="bank" size={24} color="black" />
          </View>

          <View className="w-full">
            <UiText className="text-gray-900 font-bold text-2xl mt-1">
              **** **** **** 1234
            </UiText>
          </View>

          <View className="w-full flex-row justify-between">
            <View>
              <Text>Card Holder Name</Text>
              <Text>John Doe</Text>
            </View>
            <View>
              <Text>Expiry Date</Text>
              <Text>01/25</Text>
            </View>
            <View>
              <Image
                source={require("@/assets/image/bank-logo/Mastercard-Logo.png")}
                style={{ width: 80
                  , height: 50 }}
              />
            </View>
          </View>
        </View>
        {/* Account Type Info */}
        <View className="bg-gray-50 rounded-2xl overflow-hidden">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-gray-500 text-sm">Account Type</Text>
            <Text className="text-gray-900 font-medium mt-1 text-base">
              {type}
            </Text>
          </View>
          <View className="p-4">
            <Text className="text-gray-500 text-sm">Category</Text>
            <Text className="text-gray-900 font-medium mt-1 text-base">
              {category}
            </Text>
          </View>
        </View>

        {/* Account Name */}
        <View className="space-y-2">
          <Text className="text-gray-900 font-medium px-1">Account Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
            placeholder="Enter account name"
            className="bg-gray-50 px-4 py-3.5 rounded-2xl text-gray-900 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Current Balance */}
        <View className="space-y-2">
          <Text className="text-gray-900 font-medium px-1">
            Current Balance
          </Text>
          <TextInput
            value={formData.balance}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                balance: text.replace(/[^0-9.]/g, ""),
              }))
            }
            placeholder="0.00"
            keyboardType="decimal-pad"
            className="bg-gray-50 px-4 py-3.5 rounded-2xl text-gray-900 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Notes */}
        <View className="space-y-2">
          <Text className="text-gray-900 font-medium px-1">Notes</Text>
          <TextInput
            value={formData.notes}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, notes: text }))
            }
            placeholder="Add notes (optional)"
            multiline
            numberOfLines={4}
            className="bg-gray-50 p-4 rounded-2xl text-gray-900 text-base min-h-[120px]"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </Uiview>
  );
}
