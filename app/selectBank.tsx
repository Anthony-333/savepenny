import { View, ScrollView, Pressable, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import UiText from "@/util/UiText";
import Uiview from "@/util/Uiview";
import { useFormStore } from "@/store/useFormStore";

interface Bank {
  name: string;
  displayName: string;
  type: "bank" | "digital" | "ewallet";
}

const banks: Bank[] = [
  // Traditional Banks
  {
    name: "asia_united",
    displayName: "Asia United Bank Corporation",
    type: "bank",
  },
  { name: "bdo", displayName: "BDO Unibank, Inc.", type: "bank" },
  { name: "bpi", displayName: "Bank of the Philippine Islands", type: "bank" },
  { name: "china", displayName: "China Banking Corporation", type: "bank" },
  { name: "citi", displayName: "Citibank, N.A.", type: "bank" },
  {
    name: "eastwest",
    displayName: "EastWest Banking Corporation",
    type: "bank",
  },
  {
    name: "hongkong",
    displayName: "The Hongkong & Shanghai Banking Corp. Ltd",
    type: "bank",
  },
  {
    name: "landbank",
    displayName: "Land Bank of the Philippines",
    type: "bank",
  },
  { name: "maybank", displayName: "Maybank Philippines, Inc.", type: "bank" },
  {
    name: "metrobank",
    displayName: "Metropolitan Bank & Trust Company",
    type: "bank",
  },
  { name: "pnb", displayName: "Philippine National Bank", type: "bank" },
  { name: "psbank", displayName: "Philippine Savings Bank", type: "bank" },
  {
    name: "rcbc",
    displayName: "Rizal Commercial Banking Corporation",
    type: "bank",
  },
  { name: "security", displayName: "Security Bank Corporation", type: "bank" },
  {
    name: "unionbank",
    displayName: "Union Bank of the Philippines",
    type: "bank",
  },
  {
    name: "robinsons",
    displayName: "Robinsons Bank Corporation",
    type: "bank",
  },
  { name: "philtrust", displayName: "Philippine Trust Company", type: "bank" },
  { name: "standard", displayName: "Standard Chartered Bank", type: "bank" },

  // Digital Banks
  { name: "tonik", displayName: "Tonik Digital Bank", type: "digital" },
  { name: "gotyme", displayName: "GoTyme Bank", type: "digital" },
  { name: "maya_bank", displayName: "Maya Bank", type: "digital" },
  { name: "ofbank", displayName: "Overseas Filipino Bank", type: "digital" },
  { name: "unobank", displayName: "UNObank", type: "digital" },
  { name: "uniondigital", displayName: "UnionDigital Bank", type: "digital" },

  // E-wallets
  { name: "gcash", displayName: "GCash", type: "ewallet" },
  { name: "maya", displayName: "Maya", type: "ewallet" },
  { name: "grabpay", displayName: "GrabPay", type: "ewallet" },
  { name: "coinsph", displayName: "Coins.ph", type: "ewallet" },
  { name: "paypal", displayName: "PayPal", type: "ewallet" },
];

type FilterType = "all" | "bank" | "digital" | "ewallet";

export default function SelectBank() {
  const router = useRouter();
  const { setBank } = useFormStore();
  const { onSelect } = useLocalSearchParams<{ onSelect: string }>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [customName, setCustomName] = useState("");

  const filteredBanks = useMemo(() => {
    let filtered = banks;

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter((bank) => bank.type === filter);
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter((bank) =>
        bank.displayName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [filter, search]);

  const handleSelect = (bank: Bank | { name: string; displayName: string }) => {
    setBank(bank.name, bank.displayName);
    router.back();
    if (onSelect) {
   
      const selectFn = new Function("bank", onSelect);
      selectFn(bank);
    }
  };

  return (
    <Uiview className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center flex-1">
          <Pressable
            onPress={() => router.back()}
            className="p-2 -ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <UiText className="text-lg font-semibold ml-2">Select Bank</UiText>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-xl">
          <FontAwesome name="search" size={20} color="#6B7280" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search banks..."
            className="flex-1 ml-2 text-base"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      {/* Filters */}

      <View className="flex-row items-center space-x-2 justify-between px-4">
        {(["all", "bank", "digital", "ewallet"] as FilterType[]).map((type) => (
          <Pressable
            key={type}
            onPress={() => setFilter(type)}
            className={`px-4 py-2 rounded-full mr-2 ${
              filter === type ? "bg-[#3e9c35]" : "bg-gray-100"
            }`}
          >
            <UiText
              className={`capitalize ${
                filter === type ? "text-white" : "text-gray-600"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "bank"
                  ? "Banks"
                  : type === "digital"
                    ? "Digital Banks"
                    : "E-Wallets"}
            </UiText>
          </Pressable>
        ))}
      </View>

      {/* Bank List */}
      <ScrollView className="flex-1 px-4">
        {filteredBanks.map((bank) => (
          <Pressable
            key={bank.name}
            onPress={() => {
              console.log('Bank Selected:', {
                name: bank.name,
                displayName: bank.displayName,
                type: bank.type
              });
              handleSelect(bank);
            }}
            className="p-4 border-b border-gray-100 active:bg-gray-50"
          >
            <UiText className="text-gray-900">{bank.displayName}</UiText>
            <UiText className="text-gray-500 text-sm capitalize">
              {bank.type === "bank"
                ? "Traditional Bank"
                : bank.type === "digital"
                  ? "Digital Bank"
                  : "E-Wallet"}
            </UiText>
          </Pressable>
        ))}

        {/* Custom Bank Option */}
        {search && !filteredBanks.length && (
          <View className="p-4 border-b border-gray-100 flex-row items-center justify-between">
            <View className="flex-1">
              <UiText className="text-gray-900">{search}</UiText>
              <UiText className="text-gray-500 text-sm">Not in the list</UiText>
            </View>
            <Pressable
              onPress={() =>
                handleSelect({
                  name: search.toLowerCase().replace(/\s+/g, "_"),
                  displayName: search,
                  type: "bank",
                })
              }
              className="bg-[#3e9c35] px-4 py-2 rounded-lg"
            >
              <UiText className="text-white font-medium">Select</UiText>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Uiview>
  );
}
