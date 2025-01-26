import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import UiText from './UiText';

interface UiTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const UiTextInput: React.FC<UiTextInputProps> = ({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  className = '',
  ...props
}) => {
  return (
    <View className={`space-y-2 ${containerClassName}`}>
      {label && (
        <UiText className={`text-gray-900 font-medium px-1 ${labelClassName}`}>
          {label}
        </UiText>
      )}
      <TextInput
        className={`bg-gray-50 px-4 py-3.5 rounded-2xl text-gray-900 text-base ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <UiText className={`text-red-500 text-sm px-1 ${errorClassName}`}>
          {error}
        </UiText>
      )}
    </View>
  );
};

export default UiTextInput; 