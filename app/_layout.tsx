import "../global.css";
import "react-native-gesture-handler";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MMKV, Mode } from 'react-native-mmkv'

import "../global.css";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import StoreProvider from "@/store/useStore";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});


export const storage = new MMKV()

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  return (
    <ConvexProvider client={convex}>
      <StoreProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="dark" />
          <View
            style={{
              flex: 1,
            }}
          >
            <Stack>
              <Stack.Screen
                name="(dashboard)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addAccount"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addAccountDetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addFeatures"
                options={{ headerShown: false }}
              />
               <Stack.Screen
                name="selectBank"
                options={{ headerShown: false }}
              />
            </Stack>
          </View>
        </GestureHandlerRootView>
      </StoreProvider>
    </ConvexProvider>
  );
}
