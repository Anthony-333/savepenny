import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomeHeader from "../components/Home-header";
import { data, DataType } from "../../assets/data/data";
import Card from "../components/Card";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Activity from "../components/Activity";
import Uiview from "../../util/Uiview";
import UiText from "@/util/UiText";
import EmptyWidget from "../components/EmptyWidget";
import { storage } from "@/app/_layout";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

interface SavedAccount {
  id: string;
  type: string;
  name: string;
  balance: string;
  notes: string;
  bankId?: string;
  bankDisplayName?: string;
  colors: [string, string];
  sliderPosition: [number, number];
  lastFourDigits: string;
  showLastFourDigits: boolean;
  currency: string;
  paymentNetwork?: "visa" | "mastercard";
}

const index = () => {
  const router = useRouter();
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX_VISIBLE_ITEMS = 3;

  useEffect(() => {
    const accounts = JSON.parse(storage.getString('accounts') || '[]');
    setSavedAccounts(accounts);
  }, []);

  const handleDeleteCard = useCallback((accountId: string) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Provide haptic feedback
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            
            // Filter out the account to delete
            const updatedAccounts = savedAccounts.filter(account => account.id !== accountId);
            
            // Update state and storage
            setSavedAccounts(updatedAccounts);
            storage.set('accounts', JSON.stringify(updatedAccounts));

            // Reset current index if needed
            if (currentIndex >= updatedAccounts.length) {
              setCurrentIndex(Math.max(0, updatedAccounts.length - 1));
            }
          }
        }
      ]
    );
  }, [savedAccounts, currentIndex]);

  return (
    <Uiview paddingTop={0} className="flex-1">
      <View style={{ zIndex: 1 }}>
        <HomeHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex mb-20 mx-5"
        stickyHeaderIndices={[0]}
      >
        <View className="my-3 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <UiText className="font-bold text-2xl">Home</UiText>
            {savedAccounts.length > 0 && (
              <UiText className="text-gray-500 ml-2">
                ({currentIndex + 1}/{savedAccounts.length})
              </UiText>
            )}
          </View>
          <View className="flex-row gap-2">
            {savedAccounts.length > 0 && currentIndex < savedAccounts.length && (
              <TouchableOpacity 
                onPress={() => handleDeleteCard(savedAccounts[currentIndex].id)}
                className="bg-red-500 w-10 h-10 rounded-full items-center justify-center"
                activeOpacity={0.7}
              >
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={() => router.push("/addAccount")}
              className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex items-center h-[200]" style={{ zIndex: 1 }}>
          {savedAccounts.length === 0 ? (
            <EmptyWidget type="account" />
          ) : (
            savedAccounts.map((account, index) => {
              if (index > currentIndex + MAX_VISIBLE_ITEMS || index < currentIndex) {
                return null;
              }
              return (
                <Card
                  key={account.id}
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
              );
            })
          )}
        </View>

        <View className="">
          <EmptyWidget type="features" />
        </View>
      </ScrollView>
    </Uiview>
  );
};

export default index;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 3 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
