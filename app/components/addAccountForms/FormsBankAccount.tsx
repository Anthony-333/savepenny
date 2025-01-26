import { View, Pressable, Dimensions } from "react-native";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import { Image } from "expo-image";
import UiTextInput from "@/util/UiTextInput";
import { LinearGradient } from "expo-linear-gradient";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ColorPicker from 'react-native-wheel-color-picker';
import BankLogoDropdown from "@/util/BankLogoDropdown";
import bankData from '@/assets/image/bank-logo/index.json';
import { getBankLogo } from '@/util/getBankLogo';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Predefined gradient colors
const GRADIENT_COLORS = [
  '#FF0000', // Red
  '#FF4500', // Orange Red
  '#FF8C00', // Dark Orange
  '#FFD700', // Gold
  '#32CD32', // Lime Green
  '#00CED1', // Dark Turquoise
  '#4169E1', // Royal Blue
  '#8A2BE2', // Blue Violet
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#9400D3', // Dark Violet
  '#4B0082', // Indigo
];

interface FormData {
  name: string;
  balance: string;
  notes: string;
  bankId?: string;
}

interface FormsBankAccountProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  type: string;
  category: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 140; // Accounting for padding and color circles

const CustomTrack = ({ min, max, values }: { min: number; max: number; values: number[] }) => {
  const gradientColors = GRADIENT_COLORS.slice(
    Math.min(...values),
    Math.max(...values) + 1
  ) as [string, string, ...string[]];

  return (
    <View className="absolute left-0 right-0 h-2 rounded-full overflow-hidden">
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-full"
      />
    </View>
  );
};

const FormsBankAccount = ({
  formData,
  setFormData,
  type,
  category,
}: FormsBankAccountProps) => {
  const [colors, setColors] = useState<[string, string]>(['#FF0000', '#4B0082']);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState([0, 100]);
  
  // Bottom sheet ref and snap points
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const selectedBank = useMemo(() => {
    if (!formData.bankId) return null;
    return bankData.traditional.find(b => b.name === formData.bankId) ||
           bankData.digital.find(b => b.name === formData.bankId);
  }, [formData.bankId]);

  const handleColorChange = (color: string) => {
    setColors(prev => {
      const newColors = [...prev] as [string, string];
      newColors[activeColorIndex] = color;
      return newColors;
    });
  };

  const handleSliderChange = (values: number[]) => {
    setSliderPosition(values);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenColorPicker = useCallback((index: number) => {
    setActiveColorIndex(index);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const handleCloseColorPicker = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View className="space-y-4">
        <LinearGradient
          colors={colors}
          start={{ x: sliderPosition[0] / 100, y: 0 }}
          end={{ x: sliderPosition[1] / 100, y: 0 }}
          className="flex-col justify-between items-center w-full h-56"
          style={{ borderRadius: 16, padding: 20 }}
        >
          <View className="flex-row items-center justify-between w-full">
            <FontAwesome name="bank" size={24} color="white" />
            <UiText className="text-white font-bold text-xl">
              {selectedBank?.displayName || 'Select a Bank'}
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
              <UiText className="text-white">{formData.name || 'John Doe'}</UiText>
            </View>
            <View>
              <UiText className="text-white/70">Expiry Date</UiText>
              <UiText className="text-white">01/25</UiText>
            </View>
            {selectedBank && (
              <View className="w-20 h-12 bg-white/10 rounded-lg items-center justify-center overflow-hidden">
                <Image
                  source={getBankLogo(selectedBank.name)}
                  style={{ width: '90%', height: '90%' }}
                  contentFit="contain"
                />
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Color Selection */}
        <View className=" py-2">
          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={() => handleOpenColorPicker(0)}
              style={{ backgroundColor: colors[0] }}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <View className="flex-1 mx-4">
              <MultiSlider
                values={sliderPosition}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                snapped
                containerStyle={{ height: 40 }}
                trackStyle={{ height: 6, borderRadius: 3 }}
                selectedStyle={{ backgroundColor: '#2563eb' }}
                unselectedStyle={{ backgroundColor: '#e5e7eb' }}
                markerStyle={{
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5
                }}
                onValuesChange={handleSliderChange}
              />
            </View>
            <Pressable
              onPress={() => handleOpenColorPicker(1)}
              style={{ backgroundColor: colors[1] }}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </View>
        </View>

        {/* Bank Selection */}
        <View className="space-y-2">
          <UiText className="text-gray-900 font-medium px-1">Select Bank</UiText>
          <BankLogoDropdown
            value={formData.bankId}
            onChange={(bank) =>
              setFormData((prev) => ({ ...prev, bankId: bank.name }))
            }
            type={type === "Bank Account" ? "traditional" : "digital"}
          />
        </View>

        {/* Account Type Info */}
        <View className="bg-gray-50 rounded-2xl overflow-hidden">
          <View className="p-4 border-b border-gray-200">
            <UiText className="text-gray-500 text-sm">Account Type</UiText>
            <UiText className="text-gray-900 font-medium mt-1 text-base">
              {type}
            </UiText>
          </View>
          <View className="p-4">
            <UiText className="text-gray-500 text-sm">Category</UiText>
            <UiText className="text-gray-900 font-medium mt-1 text-base">
              {category}
            </UiText>
          </View>
        </View>

        {/* Account Name */}
        <UiTextInput
          label="Account Name"
          value={formData.name}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
          placeholder="Enter account names"
        />

        {/* Current Balance */}
        <UiTextInput
          label="Current Balance"
          value={formData.balance}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              balance: text.replace(/[^0-9.]/g, ""),
            }))
          }
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        {/* Notes */}
        <UiTextInput
          label="Notes"
          value={formData.notes}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, notes: text }))
          }
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
          shadowColor: '#000000',
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
            color={colors[activeColorIndex]}
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
