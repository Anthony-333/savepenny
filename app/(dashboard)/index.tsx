import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import HomeHeader from "../components/Home-header";
import { data } from "../../assets/data/data";
import Card from "../components/Card";

const index = () => {
  const [newData, setNewData] = useState([...data, ...data]);

  return (
    <View className="flex-1 bg-white">
      <HomeHeader />

      <ScrollView >
        <View className="flex justify-center items-center">
          {newData.map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
