import { Text, TextProps } from "react-native";
import React from "react";

interface UiTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  style?: object;
}

const UiText: React.FC<UiTextProps> = ({ 
  children, 
  className = '', 
  color = '#222222',
  style = {},
  ...props
}) => {
  return (
    <Text 
      className={`text-[${color}] ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};

export default UiText;
