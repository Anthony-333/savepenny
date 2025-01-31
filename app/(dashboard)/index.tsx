import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
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
          <UiText className="font-bold text-2xl">Home</UiText>
          <TouchableOpacity 
            onPress={() => router.push("/addAccount")}
            className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
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
