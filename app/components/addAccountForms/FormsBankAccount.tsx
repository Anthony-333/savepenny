import {
  View,
  Pressable,
  Dimensions,
  PanResponder,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import UiTextInput from "@/util/UiTextInput";
import { LinearGradient } from "expo-linear-gradient";
import ColorPicker from "react-native-wheel-color-picker";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useFormStore } from "@/store/useFormStore";
import { CustomGradientSlider } from "@/app/components/addAccountForms/CustomGradientSlider";

interface FormsBankAccountProps {
  type: string;
  category: string;
}

const FormsBankAccount = ({ type, category }: FormsBankAccountProps) => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["25%", "50%"];

  // Get all the state and actions from Zustand store
  const {
    formData,
    setFormData,
    setBank,
    setPaymentNetwork,
    setColors,
    setActiveColorIndex,
    setSliderPosition,
    toggleNetworkDropdown,
  } = useFormStore();

  const handleColorChange = (color: string) => {
    const newColors = [...formData.colors] as [string, string];
    newColors[formData.activeColorIndex] = color;
    setColors(newColors);
  };

  const handleOpenColorPicker = useCallback((index: number) => {
    setActiveColorIndex(index);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const handleCloseColorPicker = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="space-y-4">
        <LinearGradient
          colors={formData.colors}
          start={{ x: formData.sliderPosition[0] / 100, y: 0 }}
          end={{ x: formData.sliderPosition[1] / 100, y: 0 }}
          className="flex-col justify-between items-center w-full h-56"
          style={{ borderRadius: 16, padding: 20 }}
        >
          <View className="flex-row items-center justify-between w-full">
            <FontAwesome name="bank" size={24} color="white" />
            <UiText className="text-white font-bold text-xl">
              {formData.bankDisplayName || "Select a Bank"}
            </UiText>
          </View>

          <View className="w-full">
            <UiText className="text-white font-bold text-2xl mt-1">
              **** **** **** 1234
            </UiText>
          </View>

          <View className="w-full flex-row justify-between">
            <View>
              <UiText className="text-white/70">Card Holder Name</UiText>
              <UiText className="text-white">
                {formData.name || "John Doe"}
              </UiText>
            </View>
            <View>
              <UiText className="text-white/70">Expiry Date</UiText>
              <UiText className="text-white">01/25</UiText>
            </View>

            {formData.paymentNetwork && (
              <View className="mt-2">
                <FontAwesome
                  name={formData.paymentNetwork === "visa" ? "cc-visa" : "cc-mastercard"}
                  size={32}
                  color="white"
                />
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Color Selection */}
        <View className="py-2">
          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={() => handleOpenColorPicker(0)}
              style={{ backgroundColor: formData.colors[0] }}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <View className="flex-1 w-full px-5">
              <CustomGradientSlider
                values={formData.sliderPosition}
                min={0}
                max={100}
                onValuesChange={(values) => setSliderPosition(values as [number, number])}
              />
            </View>
            <Pressable
              onPress={() => handleOpenColorPicker(1)}
              style={{ backgroundColor: formData.colors[1] }}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </View>
        </View>

        {/* Bank Selection */}
        <View className="space-y-2">
          <UiText className="text-gray-900 font-medium px-1">Select Bank</UiText>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/selectBank",
                params: {
                  onSelect: `(bank) => {
                    console.log('Selected Bank:', bank);
                    setBank(bank.name, bank.displayName);
                  }`,
                },
              });
            }}
            className="flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl"
          >
            <UiText className={formData.bankId ? "text-gray-900" : "text-gray-500"}>
              {formData.bankDisplayName || "Select a bank"}
            </UiText>
            <FontAwesome name="chevron-right" size={16} color="#6B7280" />
          </Pressable>
        </View>

        {/* Payment Network Selection */}
        <View className="space-y-2">
          <UiText className="text-gray-900 font-medium px-1">Payment Network</UiText>
          <Pressable
            onPress={toggleNetworkDropdown}
            className="flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl"
          >
            <UiText className={formData.paymentNetwork ? "text-gray-900" : "text-gray-500"}>
              {formData.paymentNetwork
                ? formData.paymentNetwork.charAt(0).toUpperCase() +
                  formData.paymentNetwork.slice(1)
                : "Select payment network"}
            </UiText>
            <FontAwesome
              name={formData.isNetworkDropdownOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color="#6B7280"
            />
          </Pressable>

          {formData.isNetworkDropdownOpen && (
            <View className="bg-white rounded-2xl overflow-hidden border border-gray-200 mt-1">
              <Pressable
                onPress={() => setPaymentNetwork("visa")}
                className="flex-row items-center p-4 border-b border-gray-100"
              >
                <FontAwesome name="cc-visa" size={24} color="#1a1f36" className="mr-3" />
                <UiText className="text-gray-900 ml-3">Visa</UiText>
              </Pressable>
              <Pressable
                onPress={() => setPaymentNetwork("mastercard")}
                className="flex-row items-center p-4"
              >
                <FontAwesome name="cc-mastercard" size={24} color="#1a1f36" className="mr-3" />
                <UiText className="text-gray-900 ml-3">Mastercard</UiText>
              </Pressable>
            </View>
          )}
        </View>

        {/* Account Type Info */}
        <View className="bg-gray-50 rounded-2xl overflow-hidden">
          <View className="p-4 border-b border-gray-200">
            <UiText className="text-gray-500 text-sm">Account Type</UiText>
            <UiText className="text-gray-900 font-medium mt-1 text-base">{type}</UiText>
          </View>
          <View className="p-4">
            <UiText className="text-gray-500 text-sm">Category</UiText>
            <UiText className="text-gray-900 font-medium mt-1 text-base">{category}</UiText>
          </View>
        </View>

        {/* Account Name */}
        <UiTextInput
          label="Account Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ name: text })}
          placeholder="Enter account names"
        />

        {/* Current Balance */}
        <UiTextInput
          label="Current Balance"
          value={formData.balance}
          onChangeText={(text) => setFormData({ balance: text.replace(/[^0-9.]/g, "") })}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        {/* Notes */}
        <UiTextInput
          label="Notes"
          value={formData.notes}
          onChangeText={(text) => setFormData({ notes: text })}
          placeholder="Add notes (optional)"
          multiline
          numberOfLines={4}
          className="min-h-[120px]"
          textAlignVertical="top"
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <BottomSheetView className="flex-1 p-4">
          <View className="flex-row items-center justify-between mb-4">
            <UiText className="text-xl font-semibold">Select Color</UiText>
            <Pressable
              onPress={handleCloseColorPicker}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome name="times" size={24} color="#000" />
            </Pressable>
          </View>
          <ColorPicker
            color={formData.colors[formData.activeColorIndex]}
            onColorChange={handleColorChange}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default FormsBankAccount;
