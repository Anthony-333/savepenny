import { View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import EmptyWidget from "../EmptyWidget";
import AccountContainer from "../AccountContainer";
import TransactionContainer from "../TransactionContainer";
import useAccountStore from "@/app/store/useAccountStore";
import useTransactionStore from "@/app/store/useTransactionStore";
import useGoalsStore from "@/app/store/useGoalsStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UiText from "@/util/UiText";

interface HomeScreenProps {
  animatedValue: any;
  MAX_VISIBLE_ITEMS: number;
}

const HomeScreen = ({ animatedValue, MAX_VISIBLE_ITEMS }: HomeScreenProps) => {
  const { savedAccounts, setSavedAccounts, currentIndex, setCurrentIndex } =
    useAccountStore();
  const { transactions } = useTransactionStore();
  const { goals, loadGoals } = useGoalsStore();

  useEffect(() => {
    loadGoals();
  }, []);

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
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 120 }}
      bounces={true}
      overScrollMode="always"
      scrollEventThrottle={16}
      alwaysBounceVertical={true}
      style={{ width: '100%' }}
    >
      {savedAccounts.length === 0 ? (
        <View className="mx-5">
          <EmptyWidget type="account" />
        </View>
      ) : (
        <AccountContainer
          accounts={savedAccounts}
          setAccounts={setSavedAccounts}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          animatedValue={animatedValue}
          MAX_VISIBLE_ITEMS={MAX_VISIBLE_ITEMS}
          type="Bank Account"
          onDelete={handleDeleteCard}
        />
      )}

      {goals.length > 0 && (
        <View className="mx-5 mb-5">
          <View className="bg-blue-600 p-5 rounded-xl">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="flag-variant" size={24} color="white" />
                <UiText className="text-white text-lg font-semibold">
                  {goals[0].name}
                </UiText>
              </View>
              <UiText className="text-white font-medium">
                ${goals[0].currentAmount?.toLocaleString()} / ${goals[0].targetAmount.toLocaleString()}
              </UiText>
            </View>
            <UiText className="text-white/80" numberOfLines={2}>
              {goals[0].description}
            </UiText>
            
            {/* Progress Bar */}
            <View className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
              <View 
                className="h-full bg-white"
                style={{ 
                  width: `${Math.min(100, (goals[0].currentAmount || 0) / goals[0].targetAmount * 100)}%` 
                }}
              />
            </View>
          </View>
        </View>
      )}

      <View className="mx-5 pb-20">
        <TransactionContainer transactions={transactions} />
        <EmptyWidget type="features" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
