import { View, ScrollView } from "react-native";
import React from "react";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import EmptyWidget from "../EmptyWidget";
import AccountContainer from "../AccountContainer";
import TransactionContainer from "../TransactionContainer";
import useAccountStore from "@/app/store/useAccountStore";
import useTransactionStore from "@/app/store/useTransactionStore";

interface HomeScreenProps {
  animatedValue: any;
  MAX_VISIBLE_ITEMS: number;
}

const HomeScreen = ({ animatedValue, MAX_VISIBLE_ITEMS }: HomeScreenProps) => {
  const { savedAccounts, setSavedAccounts, currentIndex, setCurrentIndex } =
    useAccountStore();
  const { transactions } = useTransactionStore();

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
      className="flex mb-20"
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

      <View className="mx-5">
        <TransactionContainer transactions={transactions} />
        <EmptyWidget type="features" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
