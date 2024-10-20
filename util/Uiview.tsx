import React, { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface UiviewProps {
  children: ReactNode;
}

const Uiview: React.FC<UiviewProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, backgroundColor: "#040404", paddingTop: insets.top }}
    >
      {children}
    </View>
  );
};

export default Uiview;
