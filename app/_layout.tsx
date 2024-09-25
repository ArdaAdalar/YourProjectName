import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, View, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { useColorScheme as nativewindUseColorScheme } from 'nativewind'; 


export default function Layout() {
  const systemScheme = nativewindUseColorScheme();
  const [theme, setTheme] = useState(systemScheme);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');
     
        if (storedUsername && storedPassword) {
          await new Promise(resolve => setTimeout(resolve, -300));
          await SplashScreen.hideAsync();
          router.push({
            pathname: '/home',
            params: { username: storedUsername }
          });
        }
      } catch (error) {
        console.error('Error checking login:', error);
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
     
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);


  return (
    
      <Stack>
        
       
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      
  
  );
}
