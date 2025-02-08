import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import EmptyWidget from "../EmptyWidget";
import Card from "../Card";
import * as Haptics from "expo-haptics";
import useAccountStore from "@/app/store/useAccountStore";

interface HomeScreenProps {
  animatedValue: any;
  MAX_VISIBLE_ITEMS: number;
}

const HomeScreen = ({
  animatedValue,
  MAX_VISIBLE_ITEMS,
}: HomeScreenProps) => {
  const router = useRouter();
  const { savedAccounts, setSavedAccounts, currentIndex, setCurrentIndex } = useAccountStore();

  const handleDeleteCard = (accountId: string) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            );
            const updatedAccounts = savedAccounts.filter(
              (account) => account.id !== accountId
            );
            setSavedAccounts(updatedAccounts);
            if (currentIndex >= updatedAccounts.length) {
              setCurrentIndex(Math.max(0, updatedAccounts.length - 1));
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex mb-20"
      stickyHeaderIndices={[0]}
    >
      <View className="my-3 flex-row justify-between items-center mx-5">
        <View className="flex-row items-center">
        
          {savedAccounts.length > 0 && (
            <UiText className="text-gray-500 ml-2">
              ({currentIndex + 1}/{savedAccounts.length})
            </UiText>
          )}
        </View>
        <View className="flex-row gap-2">
          {savedAccounts.length > 0 &&
            currentIndex < savedAccounts.length && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleDeleteCard(savedAccounts[currentIndex].id)
                  }
                  className="bg-red-500 w-10 h-10 rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <AntDesign name="delete" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/addAccount")}
                  className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
        </View>
      </View>

      <View className="flex items-center h-[200]" style={{ zIndex: 1 }}>
        {savedAccounts.length === 0 ? (
          <EmptyWidget type="account" />
        ) : (
          savedAccounts.map((account, index) => {
            if (
              index > currentIndex + MAX_VISIBLE_ITEMS ||
              index < currentIndex
            ) {
              return null;
            }
            return (
              <View key={account.id} className="w-full">
                <Card
                  accounts={savedAccounts}
                  setAccounts={setSavedAccounts}
                  maxVisibleItems={MAX_VISIBLE_ITEMS}
                  account={account}
                  index={index}
                  dataLength={savedAccounts.length}
                  animatedValue={animatedValue}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </View>
            );
          })
        )}
      </View>

      <View className="">
        <EmptyWidget type="features" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;