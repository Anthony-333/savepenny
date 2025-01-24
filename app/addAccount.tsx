import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Uiview from "@/util/Uiview";

type CategoryTile = {
  name: string;
  icon: JSX.Element;
};

type Category = {
  title: string;
  items: CategoryTile[];
};

export default function AddAccount() {
  const router = useRouter();

  const categories: Category[] = [
    {
      title: "Cash",
      items: [
        {
          name: "Bank Account",
          icon: (
            <MaterialCommunityIcons name="bank" size={24} color="#4B5563" />
          ),
        },
        {
          name: "Cash",
          icon: (
            <MaterialCommunityIcons name="cash" size={24} color="#4B5563" />
          ),
        },
        {
          name: "Wallet",
          icon: (
            <MaterialCommunityIcons name="wallet" size={24} color="#4B5563" />
          ),
        },
        {
          name: "Checking",
          icon: (
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Savings",
          icon: (
            <MaterialCommunityIcons
              name="piggy-bank"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Lending",
          icon: (
            <MaterialCommunityIcons
              name="hand-coin"
              size={24}
              color="#4B5563"
            />
          ),
        },
      ],
    },
    {
      title: "Credit",
      items: [
        {
          name: "Credit Card",
          icon: (
            <MaterialCommunityIcons
              name="credit-card"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Line of Credit",
          icon: (
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={24}
              color="#4B5563"
            />
          ),
        },
      ],
    },
    {
      title: "Investment",
      items: [
        {
          name: "Retirement",
          icon: (
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Brokerage",
          icon: (
            <MaterialCommunityIcons
              name="chart-multiple"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Investment",
          icon: (
            <MaterialCommunityIcons
              name="trending-up"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Insurance",
          icon: (
            <MaterialCommunityIcons
              name="shield-check"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Crypto",
          icon: <FontAwesome5 name="bitcoin" size={24} color="#4B5563" />,
        },
      ],
    },
    {
      title: "Loans",
      items: [
        {
          name: "Loan",
          icon: (
            <MaterialCommunityIcons
              name="cash-minus"
              size={24}
              color="#4B5563"
            />
          ),
        },
        {
          name: "Mortgage",
          icon: (
            <MaterialCommunityIcons name="home" size={24} color="#4B5563" />
          ),
        },
        {
          name: "Borrowing",
          icon: (
            <MaterialCommunityIcons
              name="hand-coin"
              size={24}
              color="#4B5563"
            />
          ),
        },
      ],
    },
    {
      title: "Assets",
      items: [
        {
          name: "Property",
          icon: (
            <MaterialCommunityIcons
              name="home-city"
              size={24}
              color="#4B5563"
            />
          ),
        },
      ],
    },
    {
      title: "Money Management",
      items: [
        {
          name: "Transaction",
          icon: <MaterialCommunityIcons name="cash-multiple" size={24} color="#4B5563" />,
        },
        {
          name: "Goals",
          icon: <MaterialCommunityIcons name="flag-variant" size={24} color="#4B5563" />,
        },
        {
          name: "Budget",
          icon: <MaterialCommunityIcons name="chart-pie" size={24} color="#4B5563" />,
        },
      ],
    },
    {
      title: "Planning & Analysis",
      items: [
        {
          name: "Reports",
          icon: <MaterialCommunityIcons name="chart-bar" size={24} color="#4B5563" />,
        },
        {
          name: "Categories",
          icon: <MaterialCommunityIcons name="tag-multiple" size={24} color="#4B5563" />,
        },
      ],
    },
  ];

  return (
    <Uiview className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Pressable
          onPress={() => router.back()}
          className="p-2 -ml-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text className="text-lg font-semibold ml-2">Add Account</Text>
      </View>

      {/* Content area */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index} className="p-4">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              {category.title}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {category.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  onPress={() => {
                    // Handle tile press
                    router.push({
                      pathname: "/addAccountDetails",
                      params: { type: item.name, category: category.title },
                    });
                  }}
                  className="w-[calc(33.33%-8px)] bg-gray-50 rounded-xl p-4 items-center"
                >
                  {item.icon}
                  <Text className="text-sm text-gray-600 mt-2 text-center">
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Other Account Option */}
        <View className="p-4">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/addAccountDetails",
                params: { type: "Other", category: "Other" },
              })
            }
            className="flex-row items-center p-4 bg-gray-50 rounded-xl"
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={24}
              color="#4B5563"
            />
            <Text className="text-gray-600 ml-3">Other Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Uiview>
  );
}
