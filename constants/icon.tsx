import social from "@/app/(dashboard)/social";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export const icon = {
  index: (props: any) => <MaterialCommunityIcons name="home-variant-outline" size={24} {...props} />,
  // analytics: (props: any) => (
  //   <Ionicons name="analytics-sharp" size={24} {...props} />
  // ),

  addnew: (props: any) => (
    <Ionicons name="settings-outline" size={24} {...props} />
  ),

  social: (props: any) => (
    <Ionicons name="settings-outline" size={24} {...props} />
  ),

  // wallet: (props: any) => (
  //   <Ionicons name="wallet-outline" size={24} {...props} />
  // ),
  // settings: (props: any) => (
  //   <Ionicons name="settings-outline" size={24} {...props} />
  // ),
};
