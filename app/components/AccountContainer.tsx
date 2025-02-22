import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import UiText from "@/util/UiText";

interface AccountContainerProps {
  accounts: any[];
  currentIndex: number;
  type: string;
  onDelete?: (id: string) => void;
  children: React.ReactNode;
  isDraggable?: boolean;
}

const AccountContainer = ({
  accounts,
  currentIndex,
  type,
  onDelete,
  children,
  isDraggable = false
}: AccountContainerProps) => {
  const router = useRouter();

  const handleAddItem = () => {
    router.push({
      pathname: "/addAccountDetails",
      params: { type },
    });
  };

  return (
    <View className="">
      <View className="my-3 flex-row justify-between items-center mx-5">
        {/* Left: Item Counter */}
        <View className="flex-row items-center">
          {accounts.length > 0 && (
            <UiText className="text-gray-500">
              ({currentIndex + 1}/{accounts.length})
            </UiText>
          )}
        </View>

        {/* Middle: Draggable Pill Handle - Only show if draggable */}
        {isDraggable ? (
          <TouchableOpacity 
            className="items-center py-2"
            activeOpacity={0.7}
          >
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </TouchableOpacity>
        ) : (
          <View className="flex-1" />
        )}

        {/* Right: Action Buttons */}
        <View className="flex-row gap-2">
          {accounts.length > 0 && currentIndex < accounts.length && onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(accounts[currentIndex].id)}
              className="bg-red-500 w-7 h-7 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <AntDesign name="delete" size={16} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleAddItem}
            className="bg-blue-500 w-7 h-7 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <AntDesign name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View 
        className="items-center px-5 w-full " 
        style={{ 
          position: 'relative',
          minHeight: type === "Goal" ? 140 : 220,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default AccountContainer;
