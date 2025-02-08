import React, { useEffect, useCallback } from "react";
import HomeHeader from "../components/Home-header";
import Uiview from "../../util/Uiview";
import { View, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import Home from "../components/IndexScreens/Home";
import useAccountStore from "../store/useAccountStore";
import CategoryScreens from "../components/CategoryScreens";
import Analytics from "../components/IndexScreens/Analytics";
import Wallet from "../components/IndexScreens/Wallet";
import useScreenStore from "../store/useScreenStore";

const { width } = Dimensions.get("window");
const screens = ["Home", "Analytics", "Wallet"] as const;
const SWIPE_THRESHOLD = 0.3; // 30% threshold

const animConfig = {
  duration: 300,
  easing: Easing.out(Easing.cubic),
};

const index = () => {
  const animatedValue = useSharedValue(0);
  const translateX = useSharedValue(0);
  const MAX_VISIBLE_ITEMS = 3;
  const initializeAccounts = useAccountStore(
    (state) => state.initializeAccounts
  );
  const { activeScreen, setActiveScreen } = useScreenStore();

  const updateScreen = useCallback((screen: (typeof screens)[number]) => {
    setActiveScreen(screen);
  }, []);

  useEffect(() => {
    initializeAccounts();
  }, []);

  useEffect(() => {
    const index = screens.indexOf(activeScreen);
    translateX.value = withTiming(-index * width, animConfig);
  }, [activeScreen]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const currentIndex = screens.indexOf(activeScreen);
      const newTranslateX = -currentIndex * width + e.translationX;

      if (
        newTranslateX <= 0 &&
        newTranslateX >= -(screens.length - 1) * width
      ) {
        translateX.value = newTranslateX;
      }
    })
    .onEnd((e) => {
      const currentIndex = screens.indexOf(activeScreen);
      const swipePercentage = Math.abs(e.translationX / width);
      const direction = e.velocityX > 0 ? -1 : 1;

      // High velocity swipe
      if (Math.abs(e.velocityX) > 500) {
        if (direction < 0 && currentIndex > 0) {
          runOnJS(updateScreen)(screens[currentIndex - 1]);
        } else if (direction > 0 && currentIndex < screens.length - 1) {
          runOnJS(updateScreen)(screens[currentIndex + 1]);
        } else {
          translateX.value = withTiming(-currentIndex * width, animConfig);
        }
        return;
      }

      // Check swipe threshold
      if (swipePercentage > SWIPE_THRESHOLD) {
        const nextIndex =
          direction > 0
            ? Math.min(currentIndex + 1, screens.length - 1)
            : Math.max(currentIndex - 1, 0);
        runOnJS(updateScreen)(screens[nextIndex]);
      } else {
        // Return to current screen
        translateX.value = withTiming(-currentIndex * width, animConfig);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Uiview paddingTop={0} className="flex-1">
      <View style={{ zIndex: 1 }}>
        <HomeHeader />
      </View>

      <View className="flex-row justify-between items-center px-5">
        <CategoryScreens />
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[{ flexDirection: "row" }, animatedStyle]}
          className="flex-1"
        >
          <View style={{ width }}>
            <Home
              animatedValue={animatedValue}
              MAX_VISIBLE_ITEMS={MAX_VISIBLE_ITEMS}
            />
          </View>
          <View style={{ width }}>
            <Analytics />
          </View>
          <View style={{ width }} >
            <Wallet />
          </View>
        </Animated.View>
      </GestureDetector>
    </Uiview>
  );
};

export default index;
