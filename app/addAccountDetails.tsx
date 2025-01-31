import { View, ScrollView, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Uiview from "@/util/Uiview";
import { useState, useEffect } from "react";

import UiText from "@/util/UiText";

import FormsBankAccount from "./components/addAccountForms/FormsBankAccount";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFormStore } from "@/store/useFormStore";
import { storage } from "@/app/_layout";

export default function AddAccountDetails() {
  const router = useRouter();
  const { type, category } = useLocalSearchParams<{
    type: string;
    category: string;
  }>();

  // Get form data and submit function from Zustand store
  const { submitForm, setFormData } = useFormStore();

  // Set category in form data when component mounts
  useEffect(() => {
    if (category) {
      setFormData({ category });
    }
  }, [category]);

  const accounts = JSON.parse(storage.getString('accounts') || '[]');

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
            onPress={() => submitForm(type, category)}
            className="bg-[#3e9c35] px-5 py-2.5 rounded-lg ml-4"
          >
            <UiText className="text-white font-medium">Save</UiText>
          </Pressable>
        </View>

        {/* Form content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName=""
        >
          {type === "Bank Account" && (
            <FormsBankAccount
              type={type}
            />
          )}
        </ScrollView>
      </Uiview>
    </GestureHandlerRootView>
  );
}
