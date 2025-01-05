import { Text } from "react-native";
import React from "react";

interface UiTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const UiText: React.FC<UiTextProps> = ({ 
  children, 
  className = '', 
  color = '#222222' 
}) => {
  return (
    <Text 
      className={`text-[${color}]  ${className}`}
    >
      {children}
    </Text>
  );
};

export default UiText;
