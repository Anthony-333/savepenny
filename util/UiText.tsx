import { Text } from "react-native";
import React from "react";

interface UiTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  style?: object;
}

const UiText: React.FC<UiTextProps> = ({ 
  children, 
  className = '', 
  color = '#222222',
  style = {}
}) => {
  return (
    <Text 
      className={`text-[${color}]  ${className}`}
      style={style}
    >
      {children}
    </Text>
  );
};

export default UiText;
