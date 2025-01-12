import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

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
        }}
      />

      <Tabs.Screen
        name="addnew"
        options={{
          title: "Add New",
          headerStyle: {
            backgroundColor: "#e7305b",
          },
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
         
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
