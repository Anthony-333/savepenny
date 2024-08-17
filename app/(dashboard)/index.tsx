import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import HomeHeader from "../components/Home-header";
import { data } from "../../assets/data/data";
import Card from "../components/Card";
import { useSharedValue } from "react-native-reanimated";

const index = () => {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const animatedValue = useSharedValue(0);
  const MaxCards = 3
  return (
    <View className="flex-1 bg-white">
      <HomeHeader />

      <ScrollView className="bg-slate-100">
        <View className="flex-1 justify-center items-center mt-[50] h-[200] mx-5">
          {newData.map((item, index) => {

            if( index > currentIndex + MaxCards || index < currentIndex) {
                return null
            }
            return (
              <Card
                item={item}
                index={index}
                key={index}
                dataLength={newData.length}
                maxVisibleItem={MaxCards}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
                setCurrentIndex={setCurrentIndex}
                setNewData={setNewData}
                newData={newData}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
