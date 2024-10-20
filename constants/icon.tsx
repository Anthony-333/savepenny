import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export const icon = {
  index: (props: any) => <Feather name="home" size={24} {...props} />,
  analytics: (props: any) => (
    <Ionicons name="analytics-sharp" size={24} {...props} />
  ),
  
  wallet: (props: any) => (
    <Ionicons name="wallet-outline" size={24} {...props} />
  ),
  settings: (props: any) => (
    <Ionicons name="settings-outline" size={24} {...props} />
  ),
};
