import { View, Text, Switch, useColorScheme, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useStore()
  const colorScheme = useColorScheme()

  useEffect(() => {
    // Web-specific dark mode handling
    if (Platform.OS === 'web') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDarkMode])

  useEffect(() => {
    // Optional: Sync with system color scheme if not manually set
    if (colorScheme && isDarkMode === false) {
      toggleDarkMode()
    }
  }, [colorScheme])

  return (
    <View className={`flex-1 p-4 ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>
        Settings
      </Text>
      
      <View className="flex-row justify-between items-center">
        <Text className={`text-base ${isDarkMode ? 'text-dark-text' : 'text-light-text'}`}>
          Dark Mode
        </Text>
        <Switch 
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ 
            false: '#767577', 
            true: '#81b0ff'
          }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  )
}

export default Settings;