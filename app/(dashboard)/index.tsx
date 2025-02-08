import React, { useEffect } from "react";
import HomeHeader from "../components/Home-header";
import Uiview from "../../util/Uiview";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Home from "../components/IndexScreens/Home";
import useAccountStore from "../store/useAccountStore";
import CategoryScreens from "../components/CategoryScreens";
import Analytics from "../components/IndexScreens/Analytics";
import Wallet from "../components/IndexScreens/Wallet";

const index = () => {
  const animatedValue = useSharedValue(0);
  const MAX_VISIBLE_ITEMS = 3;
  const initializeAccounts = useAccountStore(
    (state) => state.initializeAccounts
  );

  useEffect(() => {
    initializeAccounts();
  }, []);

  return (
    <Uiview paddingTop={0} className="flex-1">
      <View style={{ zIndex: 1 }}>
        <HomeHeader />
      </View>

      <View className="flex-row justify-between items-center px-5">
        <CategoryScreens />
      </View>

      <Home
        animatedValue={animatedValue}
        MAX_VISIBLE_ITEMS={MAX_VISIBLE_ITEMS}
      />

      <Analytics />

      <Wallet />
    </Uiview>
  );
};

export default index;
