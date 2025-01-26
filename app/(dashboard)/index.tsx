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

const index = () => {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

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
    <Uiview paddingTop={0} className="flex-1">
  
      <View style={{ zIndex: 1 }}>
        <HomeHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex mb-20 mx-5"
        stickyHeaderIndices={[0]}
      >
        <View className="my-3">
          <UiText className="font-bold text-2xl">Home</UiText>
        </View>

        <View className="flex items-center h-[200]" style={{ zIndex: 1 }}>
          <EmptyWidget type="account" />

          {/* {newData.map((item, index) => {
            if (index > currentIndex + MAX || index < currentIndex) {
              return null;
            }
            return (
              <Card
                newData={newData}
                setNewData={setNewData}
                maxVisibleItems={MAX}
                item={item}
                index={index}
                dataLength={newData.length}
                animatedValue={animatedValue}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                key={index}
              />
            );
          })} */}
        </View>

        <View className="">
          {/* add new feature component here */}
          <EmptyWidget type="features" />
          {/* <View className="flex bg-white mt-7 p-5 rounded-3xl border border-gray-100 shadow-slate-200">
            <View className="flex flex-row justify-between items-center">
              <UiText className="text-2xl font-bold">Transactions</UiText>

              <TouchableOpacity>
                <UiText className="color-[#3e9c35]">view all</UiText>
              </TouchableOpacity>
            </View>

            <View style={[styles.activityContainer]} className="w-full">
              {newData[currentIndex].activity.slice(0, 5).map((item, index) => {
                return <Activity item={item} key={index} />;
              })}
            </View>
          </View> */}
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
