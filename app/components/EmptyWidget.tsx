import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

export default function EmptyWidget() {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push('/addAccount')}
      className="flex-1 items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-4 w-full h-full"
    >
      <Text className="text-gray-500 text-base font-medium">
        + Add Account
      </Text>
    </Pressable>
  )
}
