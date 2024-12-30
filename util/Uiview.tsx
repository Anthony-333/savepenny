import React, { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface UiviewProps {
  children: ReactNode;
}

const Uiview: React.FC<UiviewProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#080808", "#22095E", "#4C00FF"]}
      locations={[0.7, 0.9]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1.1, y: 0 }}
      style={{ flex: 1, paddingTop: insets.top }}
    >
      {children}
    </LinearGradient>
  );
};

export default Uiview;
