import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import HomeHeader from "../components/Home-header";
import { data } from "../../assets/data/data";
import Card from "../components/Card";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Activity from "../components/Activity";

const index = () => {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MaxCards = 3;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }

    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity: opacity,
    };
  });
  return (
    <View className="flex-1 bg-white ">
      <HomeHeader />
      <View className="mx-5 flex-1">
        <View className="flex-1 justify-center items-center mt-[20] h-[200] ">
          {newData.map((item, index) => {
            if (index > currentIndex + MaxCards || index < currentIndex) {
              return null;
            }
            return (
              <Card
                item={item}
                index={index}
                key={index}
                dataLength={newData.length}
                maxVisibleItem={MaxCards}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
                setCurrentIndex={setCurrentIndex}
                setNewData={setNewData}
                newData={newData}
              />
            );
          })}
        </View>
        <Text className="text-4xl font-bold my-5">Recent Activity</Text>

        <View style={styles.activityContainer} className="w-full ">
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            style={animatedStyle}
          >
            {newData[activityIndex].activity.map((item, index) => {
              return <Activity item={item} key={index} />;
            })}
          </Animated.ScrollView>
        </View>
      </View>
    </View>
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
