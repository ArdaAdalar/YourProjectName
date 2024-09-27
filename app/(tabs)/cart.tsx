import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';  
import 'nativewind';  
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/navigation/HeaderBar';

export default function CartScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme(); 
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');  
  const params = useLocalSearchParams();
  const { username } = params;
  const StyledPressable = styled(Pressable);
  const StyledText = styled(Text);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');  
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
    loadTheme();
  }, []);
  useEffect(() => {
    if (colorScheme === 'dark') {
      StatusBar.setBarStyle('light-content'); 
      StatusBar.setBarStyle('dark-content'); 
    }
  }, [colorScheme]);

  const toggleTheme = async () => {
    toggleColorScheme();  
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');  
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <View className={`flex-1 pt-6 ${isDarkMode ? 'bg-neutral-900' : 'bg-gray-100'}`}>
      <Header />
      
     
      <View className="flex-1 items-center justify-center" style={{ paddingTop: 60 }}> 
       
        <Text className={`text-2xl font-extrabold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'} Settings
        </Text>

       
        <TouchableOpacity
          style={{ marginBottom: 20, padding: 10, borderRadius: 50, backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb', elevation: 4 }}
          onPress={() =>
            router.push({
              pathname: "/home",
              params: { username },
            })
          }
        >
          <Ionicons name="home" size={32} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>


        <StyledPressable
          onPress={toggleTheme}
          className={`p-4 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
          style={{ marginBottom: 10, elevation: 4 }}
        >
          <StyledText className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} text-lg font-semibold`}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </StyledText>
        </StyledPressable>

     
      </View>
    </View>
  );
}
