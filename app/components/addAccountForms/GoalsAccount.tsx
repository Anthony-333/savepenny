import { View, TextInput, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import useGoalsStore from "@/app/store/useGoalsStore";

const GoalsAccount = () => {
  const router = useRouter();
  const { currentGoal, setCurrentGoal, addGoal, loadGoals } = useGoalsStore();

  useEffect(() => {
    loadGoals(); // Load existing goals
    setCurrentGoal({}); // Reset form
  }, []);

  const handleSubmit = () => {
    if (!currentGoal.name || !currentGoal.targetAmount) return;
    
    addGoal({
      name: currentGoal.name,
      description: currentGoal.description || "",
      targetAmount: Number(currentGoal.targetAmount),
    });
    
    router.back();
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Visual Banner */}
      <View className="bg-blue-600 p-5 rounded-xl mx-5 mb-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="flag-variant" size={24} color="white" />
            <UiText className="text-white text-lg font-semibold">
              {currentGoal.name || "Goal Name"}
            </UiText>
          </View>
          <UiText className="text-white font-medium">
            ${Number(currentGoal.targetAmount || 0).toLocaleString()}
          </UiText>
        </View>
        <UiText className="text-white/80" numberOfLines={2}>
          {currentGoal.description || "Goal description will appear here"}
        </UiText>
      </View>

      {/* Form */}
      <View className="px-5">
        <View className="mb-4">
          <UiText className="text-gray-600 mb-1">Goal Name</UiText>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
            placeholder="Enter goal name"
            value={currentGoal.name}
            onChangeText={(text) => setCurrentGoal({ ...currentGoal, name: text })}
          />
        </View>

        <View className="mb-4">
          <UiText className="text-gray-600 mb-1">Description</UiText>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
            placeholder="Enter goal description"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={currentGoal.description}
            onChangeText={(text) => setCurrentGoal({ ...currentGoal, description: text })}
          />
        </View>

        <View className="mb-4">
          <UiText className="text-gray-600 mb-1">Target Amount</UiText>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
            placeholder="Enter target amount"
            keyboardType="numeric"
            value={currentGoal.targetAmount?.toString()}
            onChangeText={(text) => {
              const amount = text.replace(/[^0-9]/g, "");
              setCurrentGoal({ ...currentGoal, targetAmount: Number(amount) });
            }}
          />
        </View>

        <View
          className="bg-blue-600 rounded-xl py-3 items-center mt-4"
          onTouchEnd={handleSubmit}
        >
          <UiText className="text-white font-medium">Save Goal</UiText>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoalsAccount;
