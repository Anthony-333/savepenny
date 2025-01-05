import React, { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface UiviewProps {
  children: ReactNode;
}

const Uiview: React.FC<UiviewProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#f8f8f8' }}>{children}</View>;
};

export default Uiview;
