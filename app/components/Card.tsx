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
      // Don't allow swipe if there's only one card
      if (accounts.length <= 1) {
        return;
      }

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
      // Don't handle swipe end if there's only one card
      if (accounts.length <= 1) {
        translateX.value = withTiming(0);
        return;
      }

      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          runOnJS(handleCardSwipe)();
          
          // Move current card to the end of the array
          const updatedAccounts = [...accounts];
          const [movedCard] = updatedAccounts.splice(currentIndex, 1);
          updatedAccounts.push(movedCard);
          runOnJS(setAccounts)(updatedAccounts);

          // Update current index
          const nextIndex = currentIndex === accounts.length - 1 ? 0 : currentIndex;
          runOnJS(setCurrentIndex)(nextIndex);

          // Animate the swipe
          translateX.value = withTiming(width * direction.value, {
            duration: 300,
          }, () => {
            translateX.value = 0;
          });
          
          animatedValue.value = withTiming(nextIndex, {
            duration: 300,
          });
        } else {
          // Reset position if swipe wasn't far enough
          translateX.value = withTiming(0, { duration: 300 });
          animatedValue.value = withTiming(currentIndex, { duration: 300 });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;
    const isNext = index === (currentIndex + 1) % accounts.length;
    const isPrevious = index === (currentIndex - 1 + accounts.length) % accounts.length;

    let translateY = 0;
    let scale = 1;
    let opacity = 1;

    if (!currentItem) {
      translateY = 15;
      scale = 0.9;
    }

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20]
    );

    return {
      transform: [
        { translateY },
        { scale },
        { translateX: currentItem ? translateX.value : 0 },
        { rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg" },
      ],
      opacity,
      zIndex: currentItem ? accounts.length : accounts.length - Math.abs(currentIndex - index),
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

  const formatNumber = (num: string) => {
    // Remove any non-digit characters except decimal point
    const cleanNum = num.replace(/[^0-9.]/g, "");
    // Split into whole and decimal parts
    const parts = cleanNum.split(".");
    // Add commas to whole number part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return formatted number with up to 2 decimal places
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="absolute w-full h-56 flex-row justify-center items-center "
        style={[
          {
            zIndex: dataLength - index,
            borderRadius: 20,
            overflow: 'hidden',
           
          },
          animatedStyle,
        ]}
      >
        {/* Front of the card */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: "95%",
              height: "100%",
              zIndex: isFlipped ? 0 : 1,
              borderRadius: 20,
              overflow: 'hidden',
          
            },
            frontAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={account.colors}
            start={{ x: account.sliderPosition[0] / 100, y: 0 }}
            end={{ x: account.sliderPosition[1] / 100, y: 0 }}
            className="flex-col justify-between items-center w-full h-full p-5"
           
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
                  {account.balance ? formatNumber(account.balance) : "0.00"}
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
              borderRadius: 30,
              overflow: 'hidden'
            },
            backAnimatedStyle,
          ]}
        >
          <LinearGradient
            colors={account.colors}
            start={{ x: account.sliderPosition[0] / 100, y: 0 }}
            end={{ x: account.sliderPosition[1] / 100, y: 0 }}
            className="flex-col justify-between items-center w-full h-full p-5"
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
