import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { DataType } from "../../assets/data/data";
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
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import UiText from "@/util/UiText";
type Props = {
  newData: DataType[];
  setNewData: React.Dispatch<React.SetStateAction<DataType[]>>;
  maxVisibleItems: number;
  item: DataType;
  index: number;
  dataLength: number;
  animatedValue: SharedValue<number>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Card = ({
  newData,
  setNewData,
  maxVisibleItems,
  item,
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
      // e.translationX is the distance of the swipe
      // e.translationX is positive if the swipe is to the right
      // isSwipeRight is true if the swipe is to the right
      const isSwipeRight = e.translationX > 0;

      // direction 1 is right, -1 is left
      direction.value = isSwipeRight ? 1 : -1;

      // If the current index is the same as the index of the card
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
          // Update the current index first
          runOnJS(setCurrentIndex)(currentIndex + 1);
          // Then update the data and animate
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setNewData)([...newData, newData[currentIndex]]);
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

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="absolute w-full h-[200] flex flex-col justify-between"
        style={[
          {
            zIndex: dataLength - index,
          },
          animatedStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              padding: 20,
              backgroundColor: "white",
              borderRadius: 25,
              width: "100%",
              height: "100%",
              zIndex: 2,
              borderWidth: 2,
              borderColor: "#c2e0c1",
              shadowColor: "#bfbfbf",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.55,
              shadowRadius: 14.78,
              elevation: 22,
            },
            frontAnimatedStyle,
          ]}
        >
          <View style={[]}>
            <View className="flex flex-row justify-between">
              <View>
                <UiText className="font-semibold text-2xl ">Salary</UiText>
              </View>

              <TouchableOpacity onPress={handleFlipCard}>
                <FontAwesome5 name="exchange-alt" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="">
              <UiText className="text-4xl font-bold text-center">
                Php 50,000
              </UiText>
              <UiText className="text-center">Total Balance</UiText>
            </View>
            <View className="flex flex-row justify-between">
              <View className="w-[30%] flex flex-col items-center">
                <View className="flex flex-row items-center gap-1">
                  <FontAwesome5 name="arrow-up" size={15} color="green" />
                  <UiText className="text-xl">Income</UiText>
                </View>

                <UiText className="font-semibold">₱ 50,000</UiText>
              </View>

              <View className="w-[30%] flex flex-col items-center">
                <View className="flex flex-row items-center gap-1">
                  <FontAwesome5 name="arrow-down" size={15} color="red" />
                  <UiText className="text-xl">Expense</UiText>
                </View>

                <UiText className="font-semibold">₱ 10,000</UiText>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: "absolute",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 25,
              width: "100%",
              height: "100%",
              zIndex: 2,
              borderWidth: 2,
              borderColor: "#c2e0c1",
              shadowColor: "#bfbfbf",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.55,
              shadowRadius: 14.78,
              elevation: 22,
            },
            backAnimatedStyle,
          ]}
        >
          <View className="flex flex-row justify-between">
            <TouchableOpacity onPress={handleFlipCard}>
              <FontAwesome5 name="exchange-alt" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center items-center">
            <UiText className="text-2xl font-bold">Additional Details</UiText>
            <UiText className="text-center mt-2">
              More information about the transaction
            </UiText>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Card);
