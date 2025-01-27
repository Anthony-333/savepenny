import React, { useState, useEffect } from 'react';
import { View, PanResponder } from 'react-native';

interface CustomGradientSliderProps {
  values: number[];
  min: number;
  max: number;
  onValuesChange: (values: number[]) => void;
}

interface SliderPositions {
  left: number;
  right: number;
}

export const CustomGradientSlider: React.FC<CustomGradientSliderProps> = ({
  values,
  min,
  max,
  onValuesChange,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [positions, setPositions] = useState<SliderPositions>({ left: 0, right: 0 });

  useEffect(() => {
    const leftPos = (values[0] / (max - min)) * sliderWidth;
    const rightPos = (values[1] / (max - min)) * sliderWidth;
    setPositions({ left: leftPos, right: rightPos });
  }, [sliderWidth, values, max, min]);

  const leftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const newPos = Math.max(0, Math.min(gesture.moveX, positions.right));
      setPositions((prev: SliderPositions) => ({ ...prev, left: newPos }));
      const newValue = Math.round((newPos / sliderWidth) * (max - min));
      onValuesChange([newValue, values[1]]);
    },
  });

  const rightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const newPos = Math.min(
        sliderWidth,
        Math.max(gesture.moveX, positions.left)
      );
      setPositions((prev: SliderPositions) => ({ ...prev, right: newPos }));
      const newValue = Math.round((newPos / sliderWidth) * (max - min));
      onValuesChange([values[0], newValue]);
    },
  });

  return (
    <View
      className="h-12 justify-center"
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
    >
      {/* Track */}
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Active Track */}
        <View
          style={{
            position: "absolute",
            left: `${(positions.left / sliderWidth) * 100}%`,
            right: `${100 - (positions.right / sliderWidth) * 100}%`,
            height: "100%",
            backgroundColor: "#3e9c35",
          }}
        />
      </View>

      {/* Thumbs */}
      <View
        {...leftPanResponder.panHandlers}
        style={{
          position: "absolute",
          left: positions.left - 12,
        }}
        className="w-6 h-6 rounded-full bg-white shadow-lg border border-gray-200"
      />
      <View
        {...rightPanResponder.panHandlers}
        style={{
          position: "absolute",
          left: positions.right - 12,
        }}
        className="w-6 h-6 rounded-full bg-white shadow-lg border border-gray-200"
      />
    </View>
  );
}; 