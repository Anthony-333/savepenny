import "../global.css"
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
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack>
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="addAccount" options={{ headerShown: false }} />
          <Stack.Screen name="addAccountDetails" options={{ headerShown: false }} />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}
