import {
  View,
  Pressable,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import UiTextInput from "@/util/UiTextInput";
import UiButton from "@/util/UiButton";
import { LinearGradient } from "expo-linear-gradient";
import ColorPicker from "react-native-wheel-color-picker";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useFormStore } from "@/store/useFormStore";
import { CustomGradientSlider } from "@/app/components/addAccountForms/CustomGradientSlider";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface FormsBankAccountProps {
  type: string;
}

interface FormData {
  name: string;
  balance: string;
  notes: string;
  bankId?: string;
  bankDisplayName?: string;
  paymentNetwork?: "visa" | "mastercard";
  colors: [string, string];
  sliderPosition: [number, number];
  isNetworkDropdownOpen: boolean;
  activeColorIndex: number;
  lastFourDigits: string;
  expiryDate: string;
  showSensitiveInfo: boolean;
  showLastFourDigits: boolean;
  showExpiryDate: boolean;
  currency: string;
  isCurrencyDropdownOpen: boolean;
}

const FormsBankAccount = ({ type }: FormsBankAccountProps) => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["60%", "70%"];
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(true);
  const rotateValue = useSharedValue(0);

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

  const formatNumber = (num: string) => {
    // Remove any non-digit characters except decimal point
    const cleanNum = num.replace(/[^0-9.]/g, "");
    // Split into whole and decimal parts
    const parts = cleanNum.split(".");
    // Add commas to whole number part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return formatted number with up to 2 decimal places
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
  };

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

  const handleFlipCard = useCallback(() => {
    rotateValue.value = withTiming(isFlipped ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(rotateValue.value, [0, 180], [0, 180], "clamp");

    return {
      transform: [{ perspective: 400 }, { rotateY: `${rotateX}deg` }],
      backfaceVisibility: "hidden",
      opacity: interpolate(rotateValue.value, [0, 90], [1, 0], "clamp"),
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(
      rotateValue.value,
      [0, 180],
      [180, 360],
      "clamp"
    );

    return {
      transform: [{ perspective: 400 }, { rotateY: `${rotateX}deg` }],
      backfaceVisibility: "hidden",
      opacity: interpolate(rotateValue.value, [90, 180], [0, 1], "clamp"),
    };
  }, []);

  const formatDisplayName = (name: string) => {
    if (name.length >= 15) {
      const words = name.split(' ');
      if (words.length > 1) {
        // If multiple words, take first letter of each word except the last word
        return words
          .slice(0, -1)
          .map(word => word[0].toUpperCase())
          .join('. ') + '. ' + words[words.length - 1];
      }
      // If single long word, truncate with ellipsis
      return name.slice(0, 12) + '...';
    }
    return name;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-5">
        {/* Card Container */}
        <View style={{ height: 200 }}>
          {/* Front of the card */}
          <Animated.View
            style={[
              {
                position: "absolute",
                width: "100%",
                zIndex: isFlipped ? 0 : 1,
              },
              frontAnimatedStyle,
            ]}
          >
            <LinearGradient
              colors={formData.colors}
              start={{ x: formData.sliderPosition[0] / 100, y: 0 }}
              end={{ x: formData.sliderPosition[1] / 100, y: 0 }}
              className="flex-col justify-between items-center w-full h-56"
              style={{ borderRadius: 16, padding: 20 }}
            >
              <View className="flex-row items-center justify-between w-full">
                <View className="flex-row items-center gap-2">
                  <FontAwesome name="bank" size={20} color="white" />
                  <UiText className="text-white font-bold text-lg">
                    {formData.bankDisplayName || "Select a Bank"}
                  </UiText>
                </View>
                <TouchableOpacity onPress={handleFlipCard} activeOpacity={0.5}>
                  <AntDesign name="retweet" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View className="w-full items-center">
                <View className="flex-row items-center">
                  <Pressable
                    onPress={() =>
                      setFormData({
                        isCurrencyDropdownOpen:
                          !formData.isCurrencyDropdownOpen,
                      })
                    }
                    className="flex-row items-center"
                  >
                    <FontAwesome
                      name={
                        formData.isCurrencyDropdownOpen
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={12}
                      color="white"
                    />
                    <UiText className="text-white font-bold text-3xl mr-1">
                      {formData.currency}
                    </UiText>
                  </Pressable>
                  <UiText className="text-white font-bold text-3xl">
                    {formData.balance ? formatNumber(formData.balance) : "0.00"}
                  </UiText>
                </View>
                <UiText className="text-white/70 text-sm">
                  Available Balance
                </UiText>
                {formData.isCurrencyDropdownOpen && (
                  <View className="absolute top-16 left-[35%] bg-white rounded-lg shadow-lg z-50">
                    <Pressable
                      onPress={() => {
                        setFormData({
                          currency: "₱",
                          isCurrencyDropdownOpen: false,
                        });
                      }}
                      className="p-2 border-b border-gray-100"
                    >
                      <UiText>₱ Peso</UiText>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setFormData({
                          currency: "$",
                          isCurrencyDropdownOpen: false,
                        });
                      }}
                      className="p-2"
                    >
                      <UiText>$ Dollar</UiText>
                    </Pressable>
                  </View>
                )}
              </View>

              

              <View className="w-full flex-row justify-between border-t border-white/40 pt-2">
                <View>
                  <UiText className="text-white/70">Card Holder Name</UiText>
                  <UiText className="text-white">
                    {formData.name ? formatDisplayName(formData.name) : "Enter Name"}
                  </UiText>
                </View>
                <View>
                  <UiText className="text-white/70">Last 4 Digits</UiText>
                  <UiText className="text-white text-right">
                    {formData.showLastFourDigits ? formData.lastFourDigits || "_ _ _ _" : "* * * *"}
                  </UiText>
                </View>

                {formData.paymentNetwork && (
                  <View className="mt-2">
                    <FontAwesome
                      name={
                        formData.paymentNetwork === "visa"
                          ? "cc-visa"
                          : "cc-mastercard"
                      }
                      size={32}
                      color="white"
                    />
                  </View>
                )}
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Back of the card */}
          <Animated.View
            style={[
              {
                position: "absolute",
                width: "100%",
                zIndex: isFlipped ? 1 : 0,
              },
              backAnimatedStyle,
            ]}
          >
            <LinearGradient
              colors={formData.colors}
              start={{ x: formData.sliderPosition[0] / 100, y: 0 }}
              end={{ x: formData.sliderPosition[1] / 100, y: 0 }}
              className="flex-col justify-between items-center w-full h-56"
              style={{ borderRadius: 16, padding: 20 }}
            >
              <View className="flex-row items-center justify-between w-full">
                <UiText className="text-white font-bold text-lg">Notes</UiText>
                <TouchableOpacity onPress={handleFlipCard} activeOpacity={0.5}>
                  <AntDesign name="retweet" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View className="flex-1 justify-center items-center px-2">
                <UiText className="text-white text-center" numberOfLines={6}>
                  {formData.notes || "No notes added"}
                </UiText>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
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
                onValuesChange={(values) =>
                  setSliderPosition(values as [number, number])
                }
              />
            </View>
            <Pressable
              onPress={() => handleOpenColorPicker(1)}
              style={{ backgroundColor: formData.colors[1] }}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </View>
        </View>
        {/* Static Form Content */}
        <View className="mt-4">
          <View className="space-y-4">
            {/* Account Type Info */}
            <View className="space-y-2">
              <UiText className="text-gray-900 font-medium px-1">
                Account Type
              </UiText>
              <View className="p-4 bg-gray-50 rounded-2xl">
                <UiText className="text-gray-900">{type}</UiText>
              </View>
            </View>

            {/* Bank Selection */}
            <View className="space-y-2">
              <UiText className="text-gray-900 font-medium px-1">
                Select Bank
              </UiText>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/selectBank",
                    params: {
                      onSelect: `(bank) => {
                        setBank(bank.name, bank.displayName);
                      }`,
                    },
                  });
                }}
                className="flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl"
              >
                <UiText
                  className={
                    formData.bankId ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {formData.bankDisplayName || "Select a bank"}
                </UiText>
                <FontAwesome name="chevron-right" size={16} color="#6B7280" />
              </Pressable>
            </View>

            {/* Payment Network Selection */}
            <View className="space-y-2">
              <UiText className="text-gray-900 font-medium px-1">
                Payment Network
              </UiText>
              <Pressable
                onPress={toggleNetworkDropdown}
                className="flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl"
              >
                <UiText
                  className={
                    formData.paymentNetwork ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {formData.paymentNetwork
                    ? formData.paymentNetwork.charAt(0).toUpperCase() +
                      formData.paymentNetwork.slice(1)
                    : "Select payment network"}
                </UiText>
                <FontAwesome
                  name={
                    formData.isNetworkDropdownOpen
                      ? "chevron-up"
                      : "chevron-down"
                  }
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
                    <FontAwesome
                      name="cc-visa"
                      size={24}
                      color="#1a1f36"
                      className="mr-3"
                    />
                    <UiText className="text-gray-900 ml-3">Visa</UiText>
                  </Pressable>
                  <Pressable
                    onPress={() => setPaymentNetwork("mastercard")}
                    className="flex-row items-center p-4"
                  >
                    <FontAwesome
                      name="cc-mastercard"
                      size={24}
                      color="#1a1f36"
                      className="mr-3"
                    />
                    <UiText className="text-gray-900 ml-3">Mastercard</UiText>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Last 4 Digits */}
            <View className="space-y-2">
              <View className="flex-row items-center justify-between">
                <UiText className="text-gray-900 font-medium px-1">
                  Last 4 Digits
                </UiText>
                <Pressable
                  onPress={() => {
                    setFormData({
                      showLastFourDigits: !formData.showLastFourDigits
                    });
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome
                    name={formData.showLastFourDigits ? "eye" : "eye-slash"}
                    size={18}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
              <UiTextInput
                value={formData.lastFourDigits}
                onChangeText={(text) =>
                  formData.showLastFourDigits &&
                  setFormData({
                    lastFourDigits: text.replace(/[^0-9]/g, "").slice(0, 4),
                  })
                }
                placeholder="Enter last 4 digits"
                keyboardType="numeric"
                maxLength={4}
                editable={formData.showLastFourDigits}
                className={!formData.showLastFourDigits ? "opacity-50" : ""}
              />
            </View>

            {/* Account Name */}
            <UiTextInput
              label="Account Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ name: text.slice(0, 35) })}
              placeholder="Enter account name"
              maxLength={35}
            />

            {/* Current Balance */}
            <UiTextInput
              label="Current Balance"
              value={formData.balance}
              onChangeText={(text) => {
                const cleanNum = text.replace(/[^0-9.]/g, "");
                setFormData({ balance: cleanNum });
              }}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />

            {/* Notes */}
            <View className="space-y-2">
              <UiText className="text-gray-900 font-medium px-1">Notes</UiText>
              <UiTextInput
                value={formData.notes}
                onChangeText={(text) => setFormData({ notes: text })}
                placeholder="Add notes (optional)"
                multiline
                numberOfLines={4}
                className="min-h-[120px]"
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* Color Picker Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "100%",
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
            <View style={{ height: 350 }}>
              <ColorPicker
                color={formData.colors[formData.activeColorIndex]}
                onColorChange={handleColorChange}
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                row={false}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default FormsBankAccount;
