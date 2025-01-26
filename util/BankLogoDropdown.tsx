import React, { useState } from 'react';
import { View, Pressable, Modal, ScrollView, TextInput } from 'react-native';
import { Image } from 'expo-image';
import UiText from './UiText';
import { Ionicons } from '@expo/vector-icons';
import bankData from '@/assets/image/bank-logo/index.json';
import { getBankLogo } from './getBankLogo';

interface BankLogoDropdownProps {
  value?: string;
  onChange: (bank: typeof bankData.traditional[0] | typeof bankData.digital[0]) => void;
  type?: 'all' | 'traditional' | 'digital';
  placeholder?: string;
}

export default function BankLogoDropdown({
  value,
  onChange,
  type = 'all',
  placeholder = 'Select a bank'
}: BankLogoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Combine and filter banks based on type
  const allBanks = [
    ...(type === 'digital' ? [] : bankData.traditional),
    ...(type === 'traditional' ? [] : bankData.digital)
  ];

  const filteredBanks = allBanks.filter(bank => 
    bank.displayName.toLowerCase().includes(search.toLowerCase())
  );

  // Find selected bank
  const selectedBank = allBanks.find(bank => bank.name === value);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        className="flex-row items-center p-4 bg-gray-50 rounded-2xl"
      >
        {selectedBank ? (
          <>
            <View className="w-8 h-8 rounded-full bg-white items-center justify-center overflow-hidden">
              <Image
                source={getBankLogo(selectedBank.name)}
                className="w-full h-full"
                contentFit="contain"
              />
            </View>
            <UiText className="flex-1 ml-3 text-gray-900">
              {selectedBank.displayName}
            </UiText>
          </>
        ) : (
          <UiText className="flex-1 text-gray-500">{placeholder}</UiText>
        )}
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color="#6B7280"
        />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-20 bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between mb-4">
                <UiText className="text-xl font-semibold">Select Bank</UiText>
                <Pressable
                  onPress={() => setIsOpen(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </Pressable>
              </View>
              
              <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-xl">
                <Ionicons name="search" size={20} color="#6B7280" />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search banks..."
                  className="flex-1 ml-2 text-base"
                  placeholderTextColor="#6B7280"
                />
              </View>
            </View>

            <ScrollView className="flex-1 p-4">
              {filteredBanks.map((bank) => (
                <Pressable
                  key={bank.name}
                  onPress={() => {
                    onChange(bank);
                    setIsOpen(false);
                  }}
                  className="flex-row items-center p-3 mb-2 rounded-xl active:bg-gray-100"
                >
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center overflow-hidden">
                    <Image
                      source={getBankLogo(bank.name)}
                      className="w-full h-full"
                      contentFit="contain"
                    />
                  </View>
                  <View className="flex-1 ml-3">
                    <UiText className="text-gray-900 font-medium">
                      {bank.displayName}
                    </UiText>
                    <UiText className="text-gray-500 text-sm">
                      {bank.category}
                    </UiText>
                  </View>
                  {value === bank.name && (
                    <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
} 