import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';  // NativeWind'in sağladığı useColorScheme hook'u
import 'nativewind';  // NativeWind'i dahil edin

export default function CartScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();  // NativeWind'den colorScheme ve toggleColorScheme kullanımı
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');  // Başlangıçta cihazın temasına göre ayar

  // AsyncStorage'dan daha önce kaydedilmiş bir tema var mı kontrol ediyoruz
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');  // Eğer daha önce kaydedilmiş tema varsa, onu kullan
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
    loadTheme();
  }, []);

  // Temayı değiştirme ve AsyncStorage'a kaydetme
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

      {/* Switch ile Tema Değiştirme */}
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}  // Switch ile temayı değiştir
        thumbColor={isDarkMode ? '#fff' : '#000'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />

      {/* Buton ile tema değiştirme */}
      <Button 
        title={`Switch to ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`} 
        onPress={toggleTheme}  // Butona basınca temayı değiştir
        color={isDarkMode ? '#fff' : '#000'}
      />
    </View>
  );
}
