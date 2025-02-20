import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import Card from "./Card";

interface AccountContainerProps {
  accounts: any[];
  setAccounts?: (accounts: any[]) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  animatedValue?: any;
  MAX_VISIBLE_ITEMS?: number;
  type: string;
  onDelete?: (id: string) => void;
  addPath?: string;
  renderItem?: (item: any) => React.ReactNode;
  showControls?: boolean;
}

const AccountContainer = ({
  accounts,
  setAccounts,
  currentIndex,
  setCurrentIndex,
  animatedValue,
  MAX_VISIBLE_ITEMS = 3,
  type,
  onDelete,
  addPath = "/addAccount",
  renderItem,
  showControls = true,
}: AccountContainerProps) => {
  const router = useRouter();

  const handleAddItem = () => {
    router.push(addPath as any);
  };

  return (
    <View className="mb-5">
      {/* Draggable Pill Handle */}
      <TouchableOpacity 
        className="w-full items-center mb-2 py-2"
        activeOpacity={0.7}
      >
        <View className="w-10 h-1 bg-gray-300 rounded-full" />
      </TouchableOpacity>

      {showControls && (
        <View className="my-3 flex-row justify-between items-center mx-5">
          <View className="flex-row items-center">
            {accounts.length > 0 && (
              <UiText className="text-gray-500 ml-2">
                ({currentIndex + 1}/{accounts.length})
              </UiText>
            )}
          </View>
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
          </View>
        </View>
      )}

      <View className="flex items-center h-[200] mx-5" style={{ zIndex: 1 }}>
        {accounts.map((account, index) => {
          if (index > currentIndex + MAX_VISIBLE_ITEMS || index < currentIndex) {
            return null;
          }
          return (
            <View key={account.id} className="w-full">
              {renderItem ? (
                renderItem(account)
              ) : setAccounts ? (
                <Card
                  accounts={accounts}
                  setAccounts={setAccounts}
                  maxVisibleItems={MAX_VISIBLE_ITEMS}
                  account={account}
                  index={index}
                  dataLength={accounts.length}
                  animatedValue={animatedValue}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AccountContainer;
