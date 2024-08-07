import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
