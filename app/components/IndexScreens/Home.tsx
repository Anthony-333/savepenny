import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
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
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface HomeScreenProps {
  animatedValue: any;
  MAX_VISIBLE_ITEMS: number;
}

const HomeScreen = ({ animatedValue, MAX_VISIBLE_ITEMS }: HomeScreenProps) => {
  const { savedAccounts, setSavedAccounts, currentIndex, setCurrentIndex } =
    useAccountStore();
  const { transactions } = useTransactionStore();
  const { goals, loadGoals } = useGoalsStore();
  const [goalIndex, setGoalIndex] = useState(0);
  const router = useRouter();

  // Shared values for drag animation
  const bankAccountY = useSharedValue(0);
  const goalsY = useSharedValue(0);
  const [sections, setSections] = useState<Array<'bank' | 'goals'>>(['bank', 'goals']);

  const bankAccountStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bankAccountY.value }],
    zIndex: bankAccountY.value !== 0 ? 1 : 0,
  }));

  const goalsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: goalsY.value }],
    zIndex: goalsY.value !== 0 ? 1 : 0,
  }));

  const bankPillRef = useRef(null);
  const goalsPillRef = useRef(null);

  const handleHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSwapSections = () => {
    setSections(prev => prev[0] === 'bank' ? ['goals', 'bank'] : ['bank', 'goals']);
  };

  const bankAccountGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(handleHaptic)();
    })
    .onUpdate((e) => {
      bankAccountY.value = e.translationY;
      if (Math.abs(e.translationY) > 100) {
        goalsY.value = e.translationY > 0 ? -200 : 200;
      }
    })
    .onEnd(() => {
      if (Math.abs(bankAccountY.value) > 100) {
        runOnJS(handleSwapSections)();
      }
      bankAccountY.value = withSpring(0);
      goalsY.value = withSpring(0);
    })
    .activateAfterLongPress(200)
    .hitSlop({ top: -10, bottom: -10, left: -10, right: -10 });

  const goalsGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(handleHaptic)();
    })
    .onUpdate((e) => {
      goalsY.value = e.translationY;
      if (Math.abs(e.translationY) > 100) {
        bankAccountY.value = e.translationY > 0 ? -200 : 200;
      }
    })
    .onEnd(() => {
      if (Math.abs(goalsY.value) > 100) {
        runOnJS(handleSwapSections)();
      }
      bankAccountY.value = withSpring(0);
      goalsY.value = withSpring(0);
    })
    .activateAfterLongPress(200)
    .hitSlop({ top: -10, bottom: -10, left: -10, right: -10 });

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

  const renderGoalCard = (goal: any) => (
    <View className="bg-blue-600 p-5 rounded-xl w-full">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons name="flag-variant" size={24} color="white" />
          <UiText className="text-white text-lg font-semibold">
            {goal.name}
          </UiText>
        </View>
        <UiText className="text-white font-medium">
          ${goal.currentAmount?.toLocaleString()} / $
          {goal.targetAmount.toLocaleString()}
        </UiText>
      </View>
      <UiText className="text-white/80" numberOfLines={2}>
        {goal.description}
      </UiText>

      <View className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
        <View
          className="h-full bg-white"
          style={{
            width: `${Math.min(100, ((goal.currentAmount || 0) / goal.targetAmount) * 100)}%`,
          }}
        />
      </View>
    </View>
  );

  const components = {
    bank: savedAccounts.length === 0 ? (
      <View className="mx-5">
        <EmptyWidget type="account" />
      </View>
    ) : (
      <GestureDetector gesture={bankAccountGesture}>
        <Animated.View style={bankAccountStyle}>
          <AccountContainer
            accounts={savedAccounts}
            setAccounts={setSavedAccounts}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            animatedValue={animatedValue}
            MAX_VISIBLE_ITEMS={MAX_VISIBLE_ITEMS}
            type="Bank Account"
            onDelete={handleDeleteCard}
            addPath="/addAccountDetails"
          />
        </Animated.View>
      </GestureDetector>
    ),
    goals: goals.length > 0 && (
      <GestureDetector gesture={goalsGesture}>
        <Animated.View style={goalsStyle}>
          <AccountContainer
            accounts={goals}
            currentIndex={goalIndex}
            setCurrentIndex={setGoalIndex}
            type="Goal"
            addPath="/addAccount"
            renderItem={renderGoalCard}
            showControls={false}
          />
        </Animated.View>
      </GestureDetector>
    ),
  } as const;

  const renderSections = () => {
    if (!sections) return null;
    return sections.map(section => components[section]);
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
      style={{ width: "100%" }}
    >
      {renderSections()}

      <View className="mx-5 pb-20">
        <TouchableOpacity
          onPress={() => router.push("/addFeatures")}
          className="border border-gray-300 py-2 rounded-lg items-center justify-center flex-row gap-1.5 mb-5"
          activeOpacity={0.7}
        >
          <AntDesign name="plus" size={14} color="#666" />
          <UiText className="text-gray-600 text-sm">Add More</UiText>
        </TouchableOpacity>

        <TransactionContainer transactions={transactions} />
        <EmptyWidget type="features" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
