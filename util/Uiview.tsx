import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface UiviewProps {
  children: ReactNode;
  paddingTop?: number;
  className?: string;
  style?: ViewStyle;
}

const Uiview: React.FC<UiviewProps> = ({ 
  children, 
  paddingTop, 
  className, 
  style 
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View 
      style={{ 
        flex: 1, 
        paddingTop: paddingTop !== undefined ? paddingTop : insets.top, 
        backgroundColor: '#f8f8f8',
        ...style
      }}
      className={className}
    >
      {children}
    </View>
  );
};

export default Uiview;
