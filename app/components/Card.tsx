import { View, Text, Image } from "react-native";
import React from "react";
import { DataType } from "../../assets/data/data";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  item: DataType;
  index: number;
  dataLength: number;
  maxVisibleItem: number;
};

const Card = ({ item, index, dataLength, maxVisibleItem }: Props) => {
  const translateX = useSharedValue(0);
  const pan = Gesture.Pan().onUpdate((e) => {
    console.log(e.translationX);
    translateX.value = e.translationX;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {
          scale: 1 - index * 0.1,
        },
        {
          translateY: index * -30,
        },
      ],
      opacity: index < maxVisibleItem ? 1 : 0,
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="absolute w-full h-full rounded-3xl p-5"
        style={[
          {
            backgroundColor: item.backgroundColor,
            zIndex: dataLength - index,
          },
          animatedStyle,
        ]}
      >
        <Text>{item.name}</Text>
        <View className="w-[80] h-[40]">
          <Image source={item.image} className="h-full w-full" />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Card;
