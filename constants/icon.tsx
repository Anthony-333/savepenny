import social from "@/app/(dashboard)/social";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

export const icon = {
  index: (props: any) => (
    <AntDesign
      name={props.isFocused ? "appstore1" : "appstore-o"}
      size={24}
      color={props.isFocused ? "#3e9c35" : props.color}
    />
  ),
  // analytics: (props: any) => (
  //   <Ionicons name="analytics-sharp" size={24} {...props} />
  // ),

  addnew: (props: any) => (
    <Ionicons name="settings-outline" size={24} {...props} />
  ),

  social: (props: any) => (
    <Ionicons
      name={props.isFocused ? "at-circle" : "at-circle-outline"}
      size={30}
      color={props.isFocused ? "#3e9c35" : props.color}
    />
  ),

  // wallet: (props: any) => (
  //   <Ionicons name="wallet-outline" size={24} {...props} />
  // ),
  // settings: (props: any) => (
  //   <Ionicons name="settings-outline" size={24} {...props} />
  // ),
};
