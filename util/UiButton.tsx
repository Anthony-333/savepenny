import { Pressable, PressableProps, View } from "react-native";
import React from "react";
import UiText from "./UiText";

interface UiButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

const UiButton: React.FC<UiButtonProps> = ({
  title,
  variant = "primary",
  fullWidth = true,
  className = "",
  textClassName = "",
  ...props
}) => {
  const baseStyle = "p-4 rounded-2xl";
  const variantStyle = variant === "primary" ? "bg-[#3e9c35]" : "bg-gray-200";
  const widthStyle = fullWidth ? "w-full" : "";
  const textColorStyle = variant === "primary" ? "text-white" : "text-gray-900";

  return (
    <Pressable
      className={`${baseStyle} ${variantStyle} ${widthStyle} ${className}`}
      {...props}
    >
      <UiText
        className={`text-center font-semibold text-lg ${textColorStyle} ${textClassName}`}
      >
        {title}
      </UiText>
    </Pressable>
  );
};

export default UiButton; 