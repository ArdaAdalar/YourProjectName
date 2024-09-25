import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';  
import 'nativewind';  
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function CartScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme(); 
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');  
  const params = useLocalSearchParams();
  const { username } = params;

 


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

  const toggleTheme = async () => {
    toggleColorScheme();  // NativeWind'den gelen tema değiştirme fonksiyonu
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');  // Yeni temayı AsyncStorage'a kaydet
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };
  


  

  return (
    <View className={`flex-1 items-center justify-center p-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        This is {isDarkMode ? 'Dark Mode' : 'Light Mode'}!
      </Text>

      <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/home",
              params: { username },

              
            })
          }
        >
          <Ionicons name="home" size={28} color={colorScheme === 'dark' ? 'grey' : 'grey'}/>

        </TouchableOpacity>
        
        <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}


