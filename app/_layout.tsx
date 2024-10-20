import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import "../global.css";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";



export default function AppLayout() {
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
        }}
      >
        <Slot />
      </View>
    </GestureHandlerRootView>
  );
}
