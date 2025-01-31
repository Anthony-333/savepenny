import {
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import { LinearGradient } from "expo-linear-gradient";

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

type Props = {
  accounts: SavedAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<SavedAccount[]>>;
  maxVisibleItems: number;
  account: SavedAccount;
  index: number;
  dataLength: number;
  animatedValue: SharedValue<number>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Card = ({
  accounts,
  setAccounts,
  maxVisibleItems,
  account,
  index,
  dataLength,
  animatedValue,
  currentIndex,
  setCurrentIndex,
}: Props) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const rotateValue = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardSwipe = () => {
    console.log("card swiped");
  };

  const handleFlipCard = useCallback(() => {
    rotateValue.value = withTiming(isFlipped ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotateValue.value, [0, 180], [0, 180], "clamp");

    return {
      transform: [{ perspective: 400 }, { rotateY: `${rotateX}deg` }],
      backfaceVisibility: "hidden",
      opacity: interpolate(rotateValue.value, [0, 90], [1, 0], "clamp"),
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(
      rotateValue.value,
      [0, 180],
      [180, 360],
      "clamp"
    );

    return {
      transform: [{ perspective: 400 }, { rotateY: `${rotateX}deg` }],
      backfaceVisibility: "hidden",
      opacity: interpolate(rotateValue.value, [90, 180], [0, 1], "clamp"),
    };
  }, []);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1]
        );
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          runOnJS(handleCardSwipe)();
          runOnJS(setCurrentIndex)(currentIndex + 1);
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setAccounts)([...accounts, accounts[currentIndex]]);
          });
          animatedValue.value = withTiming(currentIndex + 1);
        } else {
          translateX.value = withTiming(0, { duration: 500 });
          animatedValue.value = withTiming(currentIndex, { duration: 500 });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [15, 0]
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1]
    );

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20]
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1]
    );

    return {
      transform: [
        { translateY: currentItem ? 0 : translateY },
        { scale: currentItem ? 1 : scale },
        { translateX: translateX.value },
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg",
        },
      ],
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
    };
  });

  const formatDisplayName = (name: string) => {
    if (name.length >= 15) {
      const words = name.split(' ');
      if (words.length > 1) {
        return words
          .slice(0, -1)
          .map(word => word[0].toUpperCase())
          .join('. ') + '. ' + words[words.length - 1];
      }
      return name.slice(0, 12) + '...';
    }
    return name;
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="absolute w-full h-56"
        style={[
          {
            zIndex: dataLength - index,
          },
          animatedStyle,
        ]}
      >
        {/* Front of the card */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 0 : 1,
            },
            frontAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={account.colors}
            start={{ x: account.sliderPosition[0] / 100, y: 0 }}
            end={{ x: account.sliderPosition[1] / 100, y: 0 }}
            className="flex-col justify-between items-center w-full h-full rounded-2xl p-5"
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row items-center gap-2">
                <FontAwesome name="bank" size={20} color="white" />
                <UiText className="text-white font-bold text-lg">
                  {account.bankDisplayName || "Bank Account"}
                </UiText>
              </View>
              <TouchableOpacity onPress={handleFlipCard} activeOpacity={0.5}>
                <AntDesign name="retweet" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="w-full items-center">
              <View className="flex-row items-center">
                <UiText className="text-white font-bold text-3xl mr-1">
                  {account.currency}
                </UiText>
                <UiText className="text-white font-bold text-3xl">
                  {account.balance || "0.00"}
                </UiText>
              </View>
              <UiText className="text-white/70 text-sm">
                Available Balance
              </UiText>
            </View>

            <View className="w-full flex-row justify-between border-t border-white/40 pt-2">
              <View>
                <UiText className="text-white/70">Card Holder Name</UiText>
                <UiText className="text-white">
                  {formatDisplayName(account.name) || "No Name"}
                </UiText>
              </View>
              <View>
                <UiText className="text-white/70">Last 4 Digits</UiText>
                <UiText className="text-white text-right">
                  {account.showLastFourDigits ? account.lastFourDigits : "****"}
                </UiText>
              </View>
              {account.paymentNetwork && (
                <View className="mt-2">
                  <FontAwesome
                    name={
                      account.paymentNetwork === "visa"
                        ? "cc-visa"
                        : "cc-mastercard"
                    }
                    size={32}
                    color="white"
                  />
                </View>
              )}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Back of the card */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 1 : 0,
            },
            backAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={account.colors}
            start={{ x: account.sliderPosition[0] / 100, y: 0 }}
            end={{ x: account.sliderPosition[1] / 100, y: 0 }}
            className="flex-col justify-between items-center w-full h-full rounded-2xl p-5"
          >
            <View className="flex-row items-center justify-between w-full">
              <UiText className="text-white font-bold text-lg">Notes</UiText>
              <TouchableOpacity onPress={handleFlipCard} activeOpacity={0.5}>
                <AntDesign name="retweet" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center px-2">
              <UiText className="text-white text-center" numberOfLines={6}>
                {account.notes || "No notes added"}
              </UiText>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Card);
