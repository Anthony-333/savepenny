import { View, ScrollView, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Uiview from "@/util/Uiview";
import { useState } from "react";
import { Image } from "expo-image";
import UiText from "@/util/UiText";
import UiTextInput from "@/util/UiTextInput";
import FormsBankAccount from "./components/addAccountForms/FormsBankAccount";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <UiText className="text-lg font-semibold ml-2 flex-1">
              Add {type}
            </UiText>
          </View>
          <Pressable
            onPress={handleSubmit}
            className="bg-blue-500 px-5 py-2.5 rounded-lg ml-4"
          >
            <UiText className="text-white font-medium">Save</UiText>
          </Pressable>
        </View>

        {/* Form content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="p-4 space-y-6"
        >
          {type === "Bank Account" && (
            <FormsBankAccount
              formData={formData}
              setFormData={setFormData}
              type={type}
              category={category}
            />
          )}
        </ScrollView>
      </Uiview>
    </GestureHandlerRootView>
  );
}
