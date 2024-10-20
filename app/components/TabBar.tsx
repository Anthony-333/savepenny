import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabBarButton from "./TabBarButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const [dimensions, setDimensions] = useState({ width: 20, height: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  const tabPosition = useSharedValue(0);

  useEffect(() => {
    tabPosition.value = withSpring(buttonWidth * state.index, {
      damping: 15,
      stiffness: 120,
    });
  }, [state.index, buttonWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPosition.value }],
    };
  });

  return (
    <View
      style={{
        position: "absolute",
        width: windowWidth,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        bottom: 0,
      }}
    >
      <View
        onLayout={onTabBarLayout}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: 0,
          backgroundColor: "#080808",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: Platform.OS == "ios" ? 0.3 : 0.0,
          height: Platform.OS === "ios" ? 100 : 60,
          overflow: "hidden",
          paddingBottom: insets.bottom,
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              height: "100%",
              width: buttonWidth,
              left: 0,
            },
          ]}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#723FEB",
                borderRadius: 30,
                height: "85%",
                width: "85%",
              }}
            />
          </View>
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Animated.View
              key={route.key}
              style={{
                width: `${100 / state.routes.length}%`,
              }}
            >
              <TabBarButton
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? "#fff" : "#222"}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
