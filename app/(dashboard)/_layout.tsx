import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Alert, Text } from "react-native";
import HomeHeader from "../components/Home-header";
import CenterButton from "../components/centerButton";
import  TabBar  from "../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",

          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerStyle: {
            backgroundColor: '#e7305b'
         }
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
         
        }}
      />
    </Tabs>
  );
}
