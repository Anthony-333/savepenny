import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import { DataType } from "../../assets/data/data";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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

  const handleCardSwipe = () => {
    console.log("card swiped");
  };

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
        className="absolute w-full h-[200] rounded-3xl p-5 flex flex-col justify-between "
        style={[
          {
            backgroundColor: 'white',
            zIndex: dataLength - index,
            borderWidth: 2,
            borderColor: '#c2e0c1',
            shadowColor: "#bfbfbf",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 22,
          },
          animatedStyle,
        ]}
      >
        <View className="flex flex-row justify-between">
          <View>
            <UiText className="font-semibold text-2xl ">Salary</UiText>
          </View>

          <View>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </View>
        </View>

        <View className="">
          <UiText className="text-4xl font-bold text-center">Php 50,000</UiText>
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

      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Card);
