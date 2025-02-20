import { View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import UiText from "@/util/UiText";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}

interface TransactionContainerProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

const TransactionContainer = ({
  transactions,
  onDelete,
}: TransactionContainerProps) => {
  const router = useRouter();

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View className="flex-row items-center justify-between py-3 px-4 border-b border-gray-100">
      <View className="flex-row items-center gap-3">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${item.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
          <AntDesign 
            name={item.type === 'income' ? "arrowup" : "arrowdown"} 
            size={20} 
            color={item.type === 'income' ? "#22c55e" : "#ef4444"}
          />
        </View>
        <View>
          <UiText className="text-gray-800 font-medium">{item.title}</UiText>
          <UiText className="text-gray-500 text-sm">{item.category}</UiText>
        </View>
      </View>
      <View className="items-end">
        <UiText className={`font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {item.type === 'income' ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
        </UiText>
        <UiText className="text-gray-500 text-sm">{item.date}</UiText>
      </View>
    </View>
  );

  return (
    <View className="mb-5 bg-white rounded-xl">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <UiText className="text-lg font-semibold">Recent Transactions</UiText>
        <TouchableOpacity
          onPress={() => router.push("/addTransaction")}
          className="flex-row items-center gap-1"
          activeOpacity={0.7}
        >
          <AntDesign name="plus" size={14} color="#3b82f6" />
          <UiText className="text-blue-500">Add New</UiText>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View className="py-8 items-center">
          <UiText className="text-gray-500">No transactions yet</UiText>
        </View>
      ) : (
        <FlatList
          data={transactions.slice(0, 5)} // Show only last 5 transactions
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      )}
      
      {transactions.length > 5 && (
        <TouchableOpacity
          onPress={() => router.push("/transactions")}
          className="px-4 py-3 border-t border-gray-100"
          activeOpacity={0.7}
        >
          <UiText className="text-blue-500 text-center">View All Transactions</UiText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TransactionContainer; 